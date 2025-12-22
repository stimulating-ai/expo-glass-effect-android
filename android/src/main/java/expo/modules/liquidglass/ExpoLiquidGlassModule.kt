package expo.modules.liquidglass

import android.graphics.Color
import expo.modules.kotlin.modules.Module
import expo.modules.kotlin.modules.ModuleDefinition

class ExpoLiquidGlassModule : Module() {
    override fun definition() = ModuleDefinition {
        Name("ExpoLiquidGlass")

        // LiquidGlassProvider view - wraps content and provides backdrop
        View(LiquidGlassProviderView::class) {
            Prop("backgroundColor") { view: LiquidGlassProviderView, color: String? ->
                val colorInt = try {
                    if (color != null) Color.parseColor(color) else Color.WHITE
                } catch (e: IllegalArgumentException) {
                    Color.WHITE
                }
                view.setBackgroundColorProp(colorInt)
            }
        }

        // LiquidGlassView - renders the glass effect
        View(LiquidGlassView::class) {
            // Blur effect
            Prop("blurRadius") { view: LiquidGlassView, radius: Float? ->
                view.setBlurRadius(radius ?: 10f)
            }

            // Lens refraction (Android 13+ only)
            Prop("lensHeight") { view: LiquidGlassView, height: Float? ->
                view.setLensHeight(height ?: 16f)
            }

            Prop("lensRefractionAmount") { view: LiquidGlassView, amount: Float? ->
                view.setLensRefractionAmount(amount ?: 32f)
            }

            // Color effects
            Prop("vibrancy") { view: LiquidGlassView, enabled: Boolean? ->
                view.setVibrancy(enabled ?: false)
            }

            Prop("brightness") { view: LiquidGlassView, value: Float? ->
                view.setBrightness(value ?: 0f)
            }

            Prop("contrast") { view: LiquidGlassView, value: Float? ->
                view.setContrast(value ?: 1f)
            }

            Prop("saturation") { view: LiquidGlassView, value: Float? ->
                view.setSaturation(value ?: 1f)
            }

            // Surface overlay
            Prop("surfaceOpacity") { view: LiquidGlassView, opacity: Float? ->
                view.setSurfaceOpacity(opacity ?: 0.5f)
            }

            Prop("surfaceColor") { view: LiquidGlassView, color: String? ->
                val colorInt = try {
                    if (color != null) Color.parseColor(color) else Color.WHITE
                } catch (e: IllegalArgumentException) {
                    Color.WHITE
                }
                view.setSurfaceColor(colorInt)
            }

            // Shape
            Prop("cornerRadius") { view: LiquidGlassView, radius: Float? ->
                view.setCornerRadius(radius ?: 0f)
            }
        }
    }
}
