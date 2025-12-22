package expo.modules.liquidglass

import android.content.Context
import android.graphics.Color
import android.os.Build
import android.view.View
import android.view.ViewGroup
import android.widget.FrameLayout
import androidx.compose.foundation.layout.Box
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.runtime.*
import androidx.compose.ui.Modifier
import androidx.compose.ui.graphics.drawscope.drawIntoCanvas
import androidx.compose.ui.graphics.nativeCanvas
import androidx.compose.ui.platform.ComposeView
import androidx.compose.ui.viewinterop.AndroidView
import expo.modules.kotlin.AppContext
import expo.modules.kotlin.views.ExpoView
import kyant.glasslayer.backdrop.Backdrop
import kyant.glasslayer.backdrop.layerBackdrop
import kyant.glasslayer.backdrop.rememberLayerBackdrop

/**
 * LiquidGlassProviderView wraps React Native children and provides a backdrop
 * that can be used by child LiquidGlassView components to render glass effects.
 */
class LiquidGlassProviderView(context: Context, appContext: AppContext) : ExpoView(context, appContext) {

    // Container for React Native children
    private val childrenContainer = FrameLayout(context).apply {
        layoutParams = LayoutParams(LayoutParams.MATCH_PARENT, LayoutParams.MATCH_PARENT)
    }

    // ComposeView for the backdrop system
    private val composeView = ComposeView(context).apply {
        layoutParams = LayoutParams(LayoutParams.MATCH_PARENT, LayoutParams.MATCH_PARENT)
    }

    // Backdrop state that will be shared with child LiquidGlassView instances
    internal var backdrop: Backdrop? = null
        private set

    // Background color for the backdrop
    private var bgColor: Int = Color.WHITE

    // State trigger for recomposition
    private var updateTrigger by mutableStateOf(0)

    init {
        // Add ComposeView first (bottom layer)
        addView(composeView)

        setupCompose()
    }

    private fun setupCompose() {
        composeView.setContent {
            // Create the layer backdrop that captures content
            val layerBackdrop = rememberLayerBackdrop {
                // Draw background color
                drawIntoCanvas { canvas ->
                    canvas.nativeCanvas.drawColor(bgColor)
                }
                // Draw the captured content
                drawContent()
            }

            // Store the backdrop reference for child views to access
            LaunchedEffect(layerBackdrop) {
                backdrop = layerBackdrop
            }

            // Force recomposition when trigger changes
            val trigger = updateTrigger

            Box(modifier = Modifier.fillMaxSize()) {
                // Wrap the children container in AndroidView with layerBackdrop modifier
                // This captures the React Native content as the backdrop
                AndroidView(
                    factory = { childrenContainer },
                    modifier = Modifier
                        .fillMaxSize()
                        .layerBackdrop(layerBackdrop)
                )
            }
        }
    }

    /**
     * Override addView to redirect children to the container instead of this view directly.
     * This ensures React Native children are rendered inside the backdrop capture area.
     */
    override fun addView(child: View?, index: Int) {
        if (child === composeView) {
            // Allow the ComposeView itself to be added to this view
            super.addView(child, index)
        } else if (child != null) {
            // Add other children to the container
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
        // Account for the ComposeView at index 0
        if (index == 0 && getChildAt(0) === composeView) {
            super.removeViewAt(index)
        } else {
            childrenContainer.removeViewAt(index)
            triggerUpdate()
        }
    }

    fun setBackgroundColorProp(color: Int) {
        bgColor = color
        triggerUpdate()
    }

    private fun triggerUpdate() {
        updateTrigger++
    }

    companion object {
        /**
         * Find the nearest LiquidGlassProviderView ancestor of the given view.
         */
        fun findProvider(view: View): LiquidGlassProviderView? {
            var parent = view.parent
            while (parent != null) {
                if (parent is LiquidGlassProviderView) {
                    return parent
                }
                parent = parent.parent
            }
            return null
        }
    }
}
