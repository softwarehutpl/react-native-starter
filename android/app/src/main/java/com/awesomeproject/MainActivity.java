package com.awesomeproject;

import android.os.Bundle;

import com.awesomeproject.events.AppLoadedEvent;
import com.facebook.react.ReactActivity;

import org.greenrobot.eventbus.EventBus;
import org.greenrobot.eventbus.Subscribe;
import org.greenrobot.eventbus.ThreadMode;

import java.util.Date;

public class MainActivity extends ReactActivity {

    private static long mainActivityLoadedTimestamp;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        mainActivityLoadedTimestamp = new Date().getTime();
    }

    @Override
    public void onStart() {
        super.onStart();
        EventBus.getDefault().register(this);
    }

    @Override
    public void onStop() {
        EventBus.getDefault().unregister(this);
        super.onStop();
    }

    @Subscribe(threadMode = ThreadMode.MAIN)
    public void onAppLoaded(AppLoadedEvent event) {
        // just a small optimization to clear background drawable from memory as we don't need the background anymore
        getWindow().setBackgroundDrawable(null);
    }

    /**
     * Returns the name of the main component registered from JavaScript.
     * This is used to schedule rendering of the component.
     */
    @Override
    protected String getMainComponentName() {
        return "AwesomeProject";
    }

    public static long getMainActivityLoadedTimestamp() {
        return mainActivityLoadedTimestamp;
    }
}
