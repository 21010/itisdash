import PouchDB from 'pouchdb'

const idb = {
    init(name) { 
        return new PouchDB(name) 
    },

    putData(db, data, id) {
        db.info().then(info => {
            info.doc_count > 0 ?  idb.updateData(db, data, id) : db.put({ _id: id, data })
        }).catch(error => { throw(error) })
    },

    updateData(db, data, id) {
        db.get(id).then(doc => {
            db.remove(doc)
            db.put({ _id: id, data })
        }).then(() => db.compact()).catch(error => { throw(error) })
    },

    getData(db, id, callback) {
        db.get(id).then(doc => callback(null, doc)).catch(error => callback(error))
    },
    
    getAllData(db, callback) {
        db.allDocs({ include_docs: true })
        .then(result => result.rows.map(row => row.doc.data))
        .then(result => callback(null, result))
        .catch(error => callback(error))
    }
}

export default idb