package com.gifapp

import android.graphics.Bitmap
import android.graphics.BitmapFactory
import android.os.Build
import android.util.Base64
import android.util.Log
import androidx.annotation.RequiresApi
import com.facebook.react.bridge.Promise
import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.bridge.ReactContextBaseJavaModule
import com.facebook.react.bridge.ReactMethod
import java.io.ByteArrayOutputStream
import java.io.InputStream
import java.net.HttpURLConnection
import java.net.URL

class WebPConverterModule(reactContext: ReactApplicationContext) : ReactContextBaseJavaModule(reactContext) {

    companion object {
        private const val TAG = "WebPConverterModule"
    }

    override fun getName(): String {
        return "WebPConverter"
    }

    @RequiresApi(Build.VERSION_CODES.R)
    @ReactMethod
    fun convertToWebP(imageUrl: String, promise: Promise) {
        try {
            Log.d(TAG, "Starting image conversion...")

            // Download image from URL
            val connection = URL(imageUrl).openConnection() as HttpURLConnection
            connection.doInput = true
            connection.connect()
            val input: InputStream = connection.inputStream
            val bitmap = BitmapFactory.decodeStream(input)

            val outputStream = ByteArrayOutputStream()
            bitmap.compress(Bitmap.CompressFormat.WEBP_LOSSY, 100, outputStream)

            val webpBytes = outputStream.toByteArray()
            val webpBase64 = Base64.encodeToString(webpBytes, Base64.DEFAULT)

            Log.d(TAG, "Image conversion successful.")
            promise.resolve("data:image/webp;base64,$webpBase64")
        } catch (e: Exception) {
            Log.e(TAG, "Error converting image to WebP", e)
            promise.reject("CONVERSION_ERROR", "Error converting image to WebP", e)
        }
    }
}
