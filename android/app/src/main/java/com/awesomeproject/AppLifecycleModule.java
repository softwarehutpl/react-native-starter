package com.awesomeproject;

import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;


public class AppLifecycleModule extends ReactContextBaseJavaModule {

    public AppLifecycleModule(ReactApplicationContext reactContext) {
        super(reactContext);
    }

    @Override
    public String getName() {
        return "AppLifecycleAndroid";
    }

    @ReactMethod
    public void getAppLoadedTimestamp(Promise promise) {
        promise.resolve(String.valueOf(MainApplication.getAppLoadedTimestamp()));
    }
}
