import Dataloader from 'dataloader'

const batchUser = async (User, keys) => {
  return await User.find({ _id: { $in: keys } })
}

export default ({User}) => ({
  userLoader: new Dataloader(keys => batchUser(User, keys), {
    cacheKeyFn: key => key.toString()
  })
})