package expo.modules.liquidglass

import android.content.Context
import android.graphics.Color
import android.os.Build
import android.view.View
import android.view.ViewGroup
import android.widget.FrameLayout
import androidx.compose.foundation.background
import androidx.compose.foundation.layout.Box
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.runtime.*
import androidx.compose.ui.Modifier
import androidx.compose.ui.draw.clip
import androidx.compose.ui.graphics.drawscope.drawIntoCanvas
import androidx.compose.ui.graphics.nativeCanvas
import androidx.compose.ui.platform.ComposeView
import androidx.compose.ui.unit.dp
import androidx.compose.ui.viewinterop.AndroidView
import expo.modules.kotlin.AppContext
import expo.modules.kotlin.views.ExpoView
import kyant.glasslayer.backdrop.Backdrop
import kyant.glasslayer.backdrop.drawBackdrop
import kyant.glasslayer.effect.blur
import kyant.glasslayer.effect.colorControls
import kyant.glasslayer.effect.lens
import kyant.glasslayer.effect.vibrancy

/**
 * LiquidGlassView renders a glass effect using the backdrop from a parent LiquidGlassProviderView.
 * Children of this view are rendered ON TOP of the glass effect.
 */
class LiquidGlassView(context: Context, appContext: AppContext) : ExpoView(context, appContext) {

    // Container for React Native children (content on top of the glass)
    private val childrenContainer = FrameLayout(context).apply {
        layoutParams = LayoutParams(LayoutParams.MATCH_PARENT, LayoutParams.MATCH_PARENT)
    }

    // ComposeView for the glass effect
    private val composeView = ComposeView(context).apply {
        layoutParams = LayoutParams(LayoutParams.MATCH_PARENT, LayoutParams.MATCH_PARENT)
    }

    // Glass effect properties
    private var blurRadiusDp: Float = 10f
    private var lensHeightDp: Float = 16f
    private var lensRefractionAmountDp: Float = 32f
    private var enableVibrancy: Boolean = false
    private var brightness: Float = 0f
    private var contrast: Float = 1f
    private var saturation: Float = 1f
    private var surfaceOpacity: Float = 0.5f
    private var surfaceColorInt: Int = Color.WHITE
    private var cornerRadiusDp: Float = 0f

    // State trigger for recomposition
    private var updateTrigger = mutableStateOf(0)

    // Reference to parent provider's backdrop
    private var providerBackdrop: Backdrop? = null

    init {
        // Add ComposeView first (bottom layer for the glass effect)
        addView(composeView)

        setupCompose()
    }

    override fun onAttachedToWindow() {
        super.onAttachedToWindow()
        // Find the parent provider and get its backdrop
        findAndSetupBackdrop()
    }

    private fun findAndSetupBackdrop() {
        val provider = LiquidGlassProviderView.findProvider(this)
        providerBackdrop = provider?.backdrop
        triggerUpdate()
    }

    private fun setupCompose() {
        composeView.setContent {
            val trigger by updateTrigger
            val backdrop = providerBackdrop
            val shape = RoundedCornerShape(cornerRadiusDp.dp)

            Box(modifier = Modifier.fillMaxSize()) {
                if (backdrop != null && Build.VERSION.SDK_INT >= Build.VERSION_CODES.S) {
                    // Android 12+: Use the backdrop library for glass effects
                    Box(
                        modifier = Modifier
                            .fillMaxSize()
                            .drawBackdrop(
                                backdrop = backdrop,
                                shape = { shape },
                                effects = {
                                    // Apply color controls if not default
                                    if (brightness != 0f || contrast != 1f || saturation != 1f) {
                                        colorControls(
                                            brightness = brightness,
                                            contrast = contrast,
                                            saturation = saturation
                                        )
                                    }

                                    // Apply vibrancy (saturation boost) if enabled
                                    if (enableVibrancy) {
                                        vibrancy()
                                    }

                                    // Apply blur
                                    blur(blurRadiusDp.dp.value * resources.displayMetrics.density)

                                    // Apply lens effect (Android 13+ only)
                                    if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.TIRAMISU) {
                                        val lensHeightPx = lensHeightDp.dp.value * resources.displayMetrics.density
                                        val lensAmountPx = lensRefractionAmountDp.dp.value * resources.displayMetrics.density
                                        lens(
                                            refractionHeight = lensHeightPx,
                                            refractionAmount = lensAmountPx
                                        )
                                    }
                                },
                                onDrawSurface = {
                                    // Draw semi-transparent surface overlay
                                    val alpha = (surfaceOpacity * 255).toInt()
                                    val surfaceWithAlpha = Color.argb(
                                        alpha,
                                        Color.red(surfaceColorInt),
                                        Color.green(surfaceColorInt),
                                        Color.blue(surfaceColorInt)
                                    )
                                    drawIntoCanvas { canvas ->
                                        val paint = android.graphics.Paint().apply {
                                            color = surfaceWithAlpha
                                            style = android.graphics.Paint.Style.FILL
                                        }
                                        canvas.nativeCanvas.drawRect(
                                            0f, 0f,
                                            size.width, size.height,
                                            paint
                                        )
                                    }
                                }
                            )
                    )
                } else {
                    // Fallback for Android < 12: Just show a semi-transparent background
                    val alpha = (surfaceOpacity * 255).toInt()
                    val fallbackColor = Color.argb(
                        alpha,
                        Color.red(surfaceColorInt),
                        Color.green(surfaceColorInt),
                        Color.blue(surfaceColorInt)
                    )
                    Box(
                        modifier = Modifier
                            .fillMaxSize()
                            .clip(shape)
                            .background(androidx.compose.ui.graphics.Color(fallbackColor))
                    )
                }

                // Render React Native children on top of the glass
                AndroidView(
                    factory = { childrenContainer },
                    modifier = Modifier.fillMaxSize()
                )
            }
        }
    }

    /**
     * Override addView to redirect children to the container.
     */
    override fun addView(child: View?, index: Int) {
        if (child === composeView) {
            super.addView(child, index)
        } else if (child != null) {
            childrenContainer.addView(child, index)
            triggerUpdate()
        }
    }

    override fun addView(child: View?, index: Int, params: ViewGroup.LayoutParams?) {
        if (child === composeView) {
            super.addView(child, index, params)
        } else if (child != null) {
            childrenContainer.addView(child, index, params)
            triggerUpdate()
        }
    }

    override fun removeView(child: View?) {
        if (child === composeView) {
            super.removeView(child)
        } else {
            childrenContainer.removeView(child)
            triggerUpdate()
        }
    }

    override fun removeViewAt(index: Int) {
        if (index == 0 && getChildAt(0) === composeView) {
            super.removeViewAt(index)
        } else {
            childrenContainer.removeViewAt(index)
            triggerUpdate()
        }
    }

    // Property setters
    fun setBlurRadius(radius: Float) {
        blurRadiusDp = radius
        triggerUpdate()
    }

    fun setLensHeight(height: Float) {
        lensHeightDp = height
        triggerUpdate()
    }

    fun setLensRefractionAmount(amount: Float) {
        lensRefractionAmountDp = amount
        triggerUpdate()
    }

    fun setVibrancy(enabled: Boolean) {
        enableVibrancy = enabled
        triggerUpdate()
    }

    fun setBrightness(value: Float) {
        brightness = value
        triggerUpdate()
    }

    fun setContrast(value: Float) {
        contrast = value
        triggerUpdate()
    }

    fun setSaturation(value: Float) {
        saturation = value
        triggerUpdate()
    }

    fun setSurfaceOpacity(opacity: Float) {
        surfaceOpacity = opacity.coerceIn(0f, 1f)
        triggerUpdate()
    }

    fun setSurfaceColor(color: Int) {
        surfaceColorInt = color
        triggerUpdate()
    }

    fun setCornerRadius(radius: Float) {
        cornerRadiusDp = radius
        triggerUpdate()
    }

    private fun triggerUpdate() {
        updateTrigger.value++
        // Re-check backdrop in case it wasn't available initially
        if (providerBackdrop == null) {
            findAndSetupBackdrop()
        }
    }
}
