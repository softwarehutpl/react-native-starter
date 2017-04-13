package com.awesomeproject;

import android.support.annotation.Nullable;
import android.view.View;

import com.facebook.react.uimanager.annotations.ReactProp;
import com.facebook.react.views.textinput.ReactEditText;
import com.facebook.react.views.textinput.ReactTextInputManager;


public class ErrorableEditTextManager extends ReactTextInputManager {

    @Override
    public String getName() {
        return "ErrorableEditText";
    }

    @ReactProp(name = "errorText")
    public void setError(ReactEditText view, @Nullable String errorText) {
        view.setError(errorText);

        // call measure to re-render the view using previous width and height of the view
        // without calling 'measure' method the error text would be visible but the drawable icon would not
        int widthMeasureSpec = View.MeasureSpec.makeMeasureSpec(view.getWidth(), View.MeasureSpec.EXACTLY);
        int heightMeasureSpec = View.MeasureSpec.makeMeasureSpec(view.getHeight(), View.MeasureSpec.EXACTLY);
        view.measure(widthMeasureSpec, heightMeasureSpec);
    }

    @ReactProp(name = "text")
    public void setText(ReactEditText view, @Nullable String text) {
        view.setText(text);
    }
}
