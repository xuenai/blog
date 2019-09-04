import { useState, useEffect } from 'react';

const notString = key => `"${key}" 必须是一个字符串`;
const notObject = key => `"${key}" 必须是一个对象`;
const notFunction = key => `"${key}" 必须是一个function`;
const modelNotExist = key => `名为"${key}" 的model不存在`;
const isObject = (data) => Object.prototype.toString.call(data) === '[object Object]';

const models = {};

/**
 * setStore 设置全局状态
 * @param {string} name 全局状态名称
 * @param {string} model 全局状态 包含state和actions
 */
const setStore = (name, model) => {
  let initialState;
  let getActions;
  if (process.env.NODE_ENV !== 'production') {
    if (typeof name !== 'string') {
      throw new Error(notString('name'));
    }
    if (name in models) return;

    if (!isObject(model)) {
      throw new Error(notObject('model'));
    }
    ({ state: initialState, actions: getActions } = model);
    if (!isObject(initialState)) {
      throw new Error(notObject('state'));
    }
    if (typeof getActions !== 'function') {
      throw new Error(notFunction('actions'));
    }
  } else {
    if (name in models) return;
    ({ state: initialState, actions: getActions } = model);
  }

  const getModel = (modelName = name) => {
    const { state, actions } = models[modelName];
    return { ...state, ...actions };
  };
  const setState = (payload) => {
    if (process.env.NODE_ENV !== 'production') {
      if (!isObject(payload)) {
        throw new Error(notObject('payload'));
      }
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

/**
 * useStore 使用全局状态
 * @param {string} name 需要获取的全局状态名字
 * @returns 返回设置全局状态的state和actions
 */
const useStore = (name) => {
  if (process.env.NODE_ENV !== 'production') {
    if (typeof name !== 'string') {
      throw new Error(notString('name'));
    }
    if (!(name in models)) {
      throw new Error(modelNotExist(name));
    }
  }

  const [, setState] = useState();
  const { state, actions, setters } = models[name];
  useEffect(() => {
    const index = setters.length;
    setters.push(setState);
    return () => {
      setters.splice(index, 1);
    };
  }, [setters]);
  return { ...state, ...actions };
}

/**
 * initStore 统一设置全局状态
 * @param  {...any} modules {name: xxx , model: {state: {}, actions: {}}}的对象
 */
const initStore = (...modules) => {
  modules.map(module => {
    setStore(module.name, module.model);
    return null;
  })
}

export {
  setStore,
  useStore,
  initStore,
}