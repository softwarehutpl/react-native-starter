package com.awesomeproject;

import com.awesomeproject.events.AppLoadedEvent;
import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;

import org.greenrobot.eventbus.EventBus;


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

    @ReactMethod
    public void getMainActivityAppLoadedTimestamp(Promise promise) {
        promise.resolve(String.valueOf(MainActivity.getMainActivityLoadedTimestamp()));
    }

    @ReactMethod
    public void markAppReady() {
        EventBus.getDefault().post(new AppLoadedEvent());
    }
}
