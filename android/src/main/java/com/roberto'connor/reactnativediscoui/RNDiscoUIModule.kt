package com.mediamonks.reactnative.disco

import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.bridge.ReactContextBaseJavaModule

class RNDiscoUIModule(reactContext: ReactApplicationContext) : ReactContextBaseJavaModule(reactContext) {

    override fun getName() = "RNDiscoUIModule"

    override fun getConstants(): MutableMap<String, Any> {
        return hashMapOf("count" to 1)
    }
}
