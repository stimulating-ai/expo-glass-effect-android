import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  ScrollView,
  Image,
  Dimensions,
} from 'react-native';
import { LiquidGlassProvider, LiquidGlassView } from 'expo-glass-effect-android';

const { width } = Dimensions.get('window');

export default function App() {
  return (
    <LiquidGlassProvider style={styles.container} backgroundColor="#1a1a2e">
      <ScrollView style={styles.scrollView} contentContainerStyle={styles.scrollContent}>
        {/* Sample colorful content that will appear behind the glass */}
        <View style={styles.header}>
          <Text style={styles.title}>Liquid Glass Demo</Text>
          <Text style={styles.subtitle}>Scroll to see the glass effect</Text>
        </View>

        {/* Colorful gradient boxes to show off the blur effect */}
        {[
          ['#667eea', '#764ba2'],
          ['#f093fb', '#f5576c'],
          ['#4facfe', '#00f2fe'],
          ['#43e97b', '#38f9d7'],
          ['#fa709a', '#fee140'],
          ['#a8edea', '#fed6e3'],
        ].map((colors, index) => (
          <View
            key={index}
            style={[
              styles.colorBox,
              {
                backgroundColor: colors[0],
              },
            ]}
          >
            <Text style={styles.boxText}>Content Block {index + 1}</Text>
          </View>
        ))}

        {/* Extra padding at bottom for the glass overlay */}
        <View style={{ height: 120 }} />
      </ScrollView>

      {/* Glass Bottom Bar */}
      <LiquidGlassView
        style={styles.glassBottomBar}
        blurRadius={12}
        lensHeight={16}
        lensRefractionAmount={32}
        vibrancy={true}
        surfaceOpacity={0.4}
        surfaceColor="#FFFFFF"
        cornerRadius={24}
      >
        <View style={styles.bottomBarContent}>
          <Text style={styles.bottomBarIcon}>🏠</Text>
          <Text style={styles.bottomBarIcon}>🔍</Text>
          <Text style={styles.bottomBarIcon}>❤️</Text>
          <Text style={styles.bottomBarIcon}>👤</Text>
        </View>
      </LiquidGlassView>

      {/* Floating Glass Card */}
      <LiquidGlassView
        style={styles.floatingCard}
        blurRadius={8}
        lensHeight={12}
        lensRefractionAmount={20}
        vibrancy={false}
        surfaceOpacity={0.5}
        surfaceColor="#FFFFFF"
        cornerRadius={16}
      >
        <View style={styles.cardContent}>
          <Text style={styles.cardTitle}>Glass Card</Text>
          <Text style={styles.cardDescription}>
            This card uses the liquid glass effect with blur and lens refraction.
          </Text>
        </View>
      </LiquidGlassView>
    </LiquidGlassProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingTop: 60,
  },
  header: {
    padding: 20,
    alignItems: 'center',
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: '#CCCCCC',
  },
  colorBox: {
    width: width - 40,
    height: 150,
    marginHorizontal: 20,
    marginVertical: 10,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  boxText: {
    fontSize: 20,
    fontWeight: '600',
    color: '#FFFFFF',
    textShadowColor: 'rgba(0, 0, 0, 0.3)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 3,
  },
  glassBottomBar: {
    position: 'absolute',
    bottom: 20,
    left: 20,
    right: 20,
    height: 70,
  },
  bottomBarContent: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  bottomBarIcon: {
    fontSize: 28,
  },
  floatingCard: {
    position: 'absolute',
    top: 120,
    right: 20,
    width: 180,
    height: 120,
  },
  cardContent: {
    flex: 1,
    padding: 16,
    justifyContent: 'center',
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333333',
    marginBottom: 8,
  },
  cardDescription: {
    fontSize: 12,
    color: '#666666',
    lineHeight: 16,
  },
});
