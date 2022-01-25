import { utilService } from './util.service.js'

export const storageService = {
  query,
  get,
  post,
  put,
  remove,
  postMany,
  loadFromStorage,
  saveToStorage
}

function loadFromStorage(key) {
  var val = localStorage.getItem(key)
  return val ? JSON.parse(val) : null
}

function saveToStorage(key, val) {
  localStorage[key] = JSON.stringify(val)
}



function query(entityType, delay = 500) {
  var entities = JSON.parse(localStorage.getItem(entityType)) || []
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(entities)
    }, delay)
  })
}

// GET BY ID
function get(entityType, entityId) {
  return query(entityType).then((entities) =>
    entities.find((entity) => entity._id === entityId)
  )
}

// ADD
function post(entityType, newEntity) {
  newEntity._id = utilService.makeId()
  return query(entityType).then((entities) => {
    entities.push(newEntity)
    _save(entityType, entities)
    return newEntity
  })
}

// UPDATE
function put(entityType, updatedEntity) {
  return query(entityType).then((entities) => {
    const idx = entities.findIndex((entity) => entity._id === updatedEntity._id)
    entities.splice(idx, 1, updatedEntity)
    _save(entityType, entities)
    return updatedEntity
  })
}

// REMOVE
function remove(entityType, entityId) {
  return query(entityType).then((entities) => {
    const idx = entities.findIndex((entity) => entity._id === entityId)
    entities.splice(idx, 1)
    _save(entityType, entities)
  })
}

// SAVE TO LOCAL STORAGE
function _save(entityType, entities) {
  localStorage.setItem(entityType, JSON.stringify(entities))
}

function postMany(entityType, newEntities) {
  return query(entityType).then((entities) => {
    newEntities = newEntities.map((entity) => ({ ...entity, _id: utilService.makeId() }))
    entities.push(...newEntities)
    _save(entityType, entities)
    return entities
  })
}
