import { useState, useEffect } from 'react';

const notString = key => `"${key}" 必须是一个字符串`;
const notObject = key => `"${key}" 必须是一个对象`;
const notFunction = key => `"${key}" 必须是一个function`;
const modelNotExist = key => `"${key}" model不存在`;
const isObject = (data) => Object.prototype.toString.call(data) === '[object Object]';

const models = {};
const setModule = (name, model) => {
  let initialState;
  let getActions;

  if (typeof name !== 'string') {
    throw new Error(notString('name'));
  }
  if (!isObject(model)) {
    throw new Error(notObject('model'));
  }
  if (!isObject(initialState)) {
    throw new Error(notObject('state'));
  }
  if (typeof getActions !== 'function') {
    throw new Error(notFunction('actions'));
  }
  if (name in models) return;
  ({ state: initialState, actions: getActions } = model);
  const getModel = (modelName = name) => {
    const { state, actions } = models[modelName];
    return { ...state, ...actions };
  };
  const setState = (payload) => {
    if (!isObject(payload)) {
      throw new Error(notObject('payload'));
    }
    const { state, setters } = models[name];
    const newState = { ...state, ...payload };
    models[name].state = newState;
    setters.forEach((setter) => {
      setter(newState);
    });
  };
  const actions = {};
  const setLoading = (actionName, showLoading) => {
    actions[actionName].loading = showLoading;
    setState({});
  };

  const rawActions = getActions({ model: getModel, setState });
  Object.entries(rawActions).forEach(([actionName, rawAction]) => {
    actions[actionName] = (...args) => {
      const res = rawAction(...args);
      if (!res || typeof res.then !== 'function') return res;
      return new Promise((resolve, reject) => {
        setLoading(actionName, true);
        res
          .then(resolve)
          .catch(reject)
          .finally(() => {
            setLoading(actionName, false);
          });
      });
    };
  });

  models[name] = { state: initialState, actions, setters: [] };
}

const getModule = (name) => {
  // 对name进行测
  if (typeof name !== 'string') {
    throw new Error(notString('name'));
  }
  if (!(name in models)) {
    throw new Error(modelNotExist(name));
  }
  const [, setState] = useState();
  const { state, actions, setters } = models[name];
  useEffect(() => {
    const len = setters.length;
    setters.push(setState);
    return () => {
      setters.splice(len, 1);
    };
  }, [setters]);
  return { ...state, ...actions };
}

export {
  setModule,
  getModule
}