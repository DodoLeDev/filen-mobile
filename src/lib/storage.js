import { MMKV } from "react-native-mmkv"
import { memoryCache } from "./memoryCache"

export const STORAGE_ID = "filen_v2"

const mmkv = new MMKV({
    id: STORAGE_ID
})

export const storage = {
    set: (key, value) => {
        mmkv.set(key, value)
        memoryCache.set("mmkv:" + key, value)
    
        return true
    },
    setAsync: (key, value) => {
        return new Promise((resolve, reject) => {
            try{
                mmkv.set(key, value)
                memoryCache.set("mmkv:" + key, value)
            }
            catch(e){
                return reject(e)
            }

            return resolve(true)
        })
    },
    getString: (key) => {
        if(memoryCache.has("mmkv:" + key)){
            return memoryCache.get("mmkv:" + key)
        }
    
        const res = mmkv.getString(key)

        memoryCache.set("mmkv:" + key, res)

        return res
    },
    getStringAsync: (key) => {
        return new Promise((resolve, reject) => {
            if(memoryCache.has("mmkv:" + key)){
                return resolve(memoryCache.get("mmkv:" + key))
            }
        
            try{
                var res = mmkv.getString(key)

                memoryCache.set("mmkv:" + key, res)
            }
            catch(e){
                return reject(e)
            }
    
            return resolve(res)
        })
    },
    getBoolean: (key) => {
        if(memoryCache.has("mmkv:" + key)){
            return memoryCache.get("mmkv:" + key)
        }
    
        const res = mmkv.getBoolean(key)

        memoryCache.set("mmkv:" + key, res)

        return res
    },
    getBooleanAsync: (key) => {
        return new Promise((resolve, reject) => {
            if(memoryCache.has("mmkv:" + key)){
                return resolve(memoryCache.get("mmkv:" + key))
            }
        
            try{
                var res = mmkv.getBoolean(key)
    
                memoryCache.set("mmkv:" + key, res)
            }
            catch(e){
                return reject(e)
            }
    
            return resolve(res)
        })
    },
    getNumber: (key) => {
        if(memoryCache.has("mmkv:" + key)){
            return memoryCache.get("mmkv:" + key)
        }
    
        const res = mmkv.getNumber(key)

        memoryCache.set("mmkv:" + key, res)

        return res
    },
    getNumberAsync: (key) => {
        return new Promise((resolve, reject) => {
            if(memoryCache.has("mmkv:" + key)){
                return resolve(memoryCache.get("mmkv:" + key))
            }
        
            try{
                var res = mmkv.getNumber(key)
    
                memoryCache.set("mmkv:" + key, res)
            }
            catch(e){
                return reject(e)
            }
    
            return resolve(res)
        })
    },
    getAllKeys: () => {
        return mmkv.getAllKeys()
    },
    getAllKeysAsync: () => {
        return new Promise((resolve, reject) => {
            try{
                return resolve(mmkv.getAllKeys())
            }
            catch(e){
                return reject(e)
            }
        })
    },
    delete: (key) => {
        mmkv.delete(key)
        memoryCache.delete("mmkv:" + key)

        return true
    },
    deleteAsync: (key) => {
        return new Promise((resolve, reject) => {
            try{
                mmkv.delete(key)
                memoryCache.delete("mmkv:" + key)
            }
            catch(e){
                return reject(e)
            }

            return resolve(true)
        })
    },
    clearAll: () => {
        mmkv.clearAll()
            
        memoryCache.cache.forEach((value, key) => {
            if(key.indexOf("mmkv:") !== -1){
                memoryCache.delete(key)
            }
        })

        return true
    },
    clearAllAsync: () => {
        return new Promise((resolve, reject) => {
            try{
                mmkv.clearAll()
        
                memoryCache.cache.forEach((value, key) => {
                    if(key.indexOf("mmkv:") !== -1){
                        memoryCache.delete(key)
                    }
                })
            }
            catch(e){
                return reject(e)
            }

            return resolve(true)
        })
    },
    contains: (key) => {
        return mmkv.contains(key)
    },
    addOnValueChangedListener: (key) => {
        return mmkv.addOnValueChangedListener(key)
    }
}