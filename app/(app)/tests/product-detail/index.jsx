import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
  Dimensions,
  StatusBar,
} from "react-native";
import { Stack, useRouter } from "expo-router";
import { AntDesign, MaterialCommunityIcons, Feather } from "@expo/vector-icons";

const ProductDetailScreen = () => {
  const router = useRouter();
  const [activeSlide, setActiveSlide] = useState(0);
  const [activeTab, setActiveTab] = useState("description");

  const slides = [
    "https://images.unsplash.com/photo-1576092768241-dec231879fc3",
    "https://images.unsplash.com/photo-1505751172876-fa1923c5c528",
    "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae",
    "https://images.unsplash.com/photo-1624913503273-5f9c4e980dba",
    "https://images.unsplash.com/photo-1581093458791-6e6c9e831726",
  ];

  const features = [
    { icon: "truck-delivery", text: "Free Delivery" },
    { icon: "shield-check", text: "2 Years Warranty" },
    { icon: "currency-inr", text: "10 Days Money Back" },
    { icon: "account-clock", text: "Free Demo" },
  ];

  // Add handlers for bottom buttons
  const handleCancel = () => {
    router.back(); // Go back to product screen
  };

  const handleBuy = () => {
    // Add your buy logic here
    router.push("/tests/checkout"); // Or wherever you want to navigate
  };

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor="#fff" barStyle="dark-content" />
      <Stack.Screen
        options={{
          title: "RythmRix",
          headerShown: true,
          headerTitleStyle: {
            fontSize: 16,
            fontWeight: "400",
          },
          headerStyle: {
            backgroundColor: "#fff",
          },
          headerShadowVisible: false,
        }}
      />

      <View style={styles.offerBanner}>
        <Text style={styles.offerText}>
          Get flat Rs. 500 off on Rythmrix 1.0 prepaid orders only.
        </Text>
      </View>

      <ScrollView style={styles.scrollView}>
        {/* Image Slider */}
        <ScrollView
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          onScroll={(e) => {
            const slide = Math.round(
              e.nativeEvent.contentOffset.x / Dimensions.get("window").width
            );
            setActiveSlide(slide);
          }}
          scrollEventThrottle={16}
        >
          {slides.map((slide, index) => (
            <View key={index} style={styles.slideContainer}>
              <Image
                source={{ uri: slide }}
                style={styles.slideImage}
                resizeMode="contain"
              />
            </View>
          ))}
        </ScrollView>

        {/* Dots Indicator */}
        <View style={styles.dotsContainer}>
          {slides.map((_, index) => (
            <View
              key={index}
              style={[styles.dot, index === activeSlide && styles.activeDot]}
            />
          ))}
        </View>

        {/* Product Info */}
        <View style={styles.productInfo}>
          <Text style={styles.productTitle}>
            Rythmrix 1.0 Lorem ipsum dolor sit amet fsddd consectetur.
          </Text>
          <Text style={styles.productDescription}>
            Lorem ipsum dolor sit amet rhhgb fdfbdbfkfvkfvnfkvnfk vkfvnfkvnf.
          </Text>
          <Text style={styles.additionalInfo}>
            Rythmrix 1.0 Lorem ipsum dolor sit amet fsdgghbna consectetur.
          </Text>

          {/* Rating */}
          <View style={styles.ratingContainer}>
            <AntDesign name="star" size={16} color="#FFD700" />
            <Text style={styles.ratingText}>4.72</Text>
            <Text style={styles.ratingCount}>2.02k ratings</Text>
          </View>

          {/* Price */}
          <View style={styles.priceContainer}>
            <Text style={styles.price}>₹5,555.00</Text>
            <Text style={styles.originalPrice}>₹9,999.00</Text>
          </View>

          {/* Book a Demo */}
          <TouchableOpacity style={styles.demoButton}>
            <View style={styles.demoContent}>
              <Text style={styles.demoTitle}>Book a Demo</Text>
              <Text style={styles.demoText}>
                Lorem ipsum dolor sit amet fsdgghbna consectetur.
              </Text>
            </View>
            <AntDesign name="right" size={20} color="#fff" />
          </TouchableOpacity>

          {/* Features Grid */}
          <View style={styles.featuresGrid}>
            {features.map((feature, index) => (
              <View
                key={index}
                style={[
                  styles.featureItem,
                  index % 2 !== 0 && styles.featureItemRight,
                  index > 1 && styles.featureItemBottom,
                ]}
              >
                <View style={styles.featureIconContainer}>
                  <MaterialCommunityIcons
                    name={feature.icon}
                    size={20}
                    color="#000"
                  />
                </View>
                <Text style={styles.featureText}>{feature.text}</Text>
              </View>
            ))}
          </View>

          {/* Tabs */}
          <View style={styles.tabContainer}>
            <TouchableOpacity
              style={[
                styles.tab,
                activeTab === "description" && styles.activeTab,
              ]}
              onPress={() => setActiveTab("description")}
            >
              <Text
                style={[
                  styles.tabText,
                  activeTab === "description" && styles.activeTabText,
                ]}
              >
                Product Description
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.tab,
                activeTab === "specifications" && styles.activeTab,
              ]}
              onPress={() => setActiveTab("specifications")}
            >
              <Text
                style={[
                  styles.tabText,
                  activeTab === "specifications" && styles.activeTabText,
                ]}
              >
                Product Specifications
              </Text>
            </TouchableOpacity>
          </View>

          {/* Tab Content */}
          {activeTab === "description" ? (
            <View style={styles.tabContent}>
              {/* Technology Section */}
              <View style={styles.technologySection}>
                <MaterialCommunityIcons name="chip" size={24} color="#074799" />
                <Text style={styles.technologyTitle}>
                  Cutting Edge Technology
                </Text>
              </View>
              <Text style={styles.technologyDescription}>
                Rythmrix 1.0 Lorem ipsum dolor sit amet consectetur. Lorem ipsum
                dolor sit amet rhhgb fdfbdbfkfvkfvnfkvnfk consectetur.
              </Text>

              {/* App Download Section */}
              <View style={styles.appSection}>
                <Text style={styles.appTitle}>Rythmrix</Text>
                <Text style={styles.appDescription}>
                  Get Rythmrix app for the complete ECG Experience
                </Text>
                <View style={styles.storeButtons}>
                  <TouchableOpacity style={styles.storeButton}>
                    <Image
                      source={{
                        uri: "https://play.google.com/intl/en_us/badges/static/images/badges/en_badge_web_generic.png"
                      }}
                      style={styles.storeImage}
                      resizeMode="contain"
                    />
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.storeButton}>
                    <Image
                      source={{
                        uri: "https://play.google.com/intl/en_us/badges/static/images/badges/en_badge_web_generic.png"
                      }}
                      style={styles.storeImage}
                      resizeMode="contain"
                    />
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          ) : (
            <View style={styles.tabContent}>
              {/* Specifications Content */}
              <View style={styles.specSection}>
                <View style={styles.specHeader}>
                  <MaterialCommunityIcons
                    name="clipboard-list"
                    size={24}
                    color="#074799"
                  />
                  <Text style={styles.specTitle}>Technical Specifications</Text>
                </View>

                <View style={styles.specItem}>
                  <Text style={styles.specLabel}>Dimensions</Text>
                  <Text style={styles.specValue}>120 x 60 x 15 mm</Text>
                </View>
                <View style={styles.specItem}>
                  <Text style={styles.specLabel}>Weight</Text>
                  <Text style={styles.specValue}>150g</Text>
                </View>
                <View style={styles.specItem}>
                  <Text style={styles.specLabel}>Battery Life</Text>
                  <Text style={styles.specValue}>Up to 48 hours</Text>
                </View>
                <View style={styles.specItem}>
                  <Text style={styles.specLabel}>Connectivity</Text>
                  <Text style={styles.specValue}>Bluetooth 5.0</Text>
                </View>
              </View>

              {/* Package Contents */}
              <View style={styles.packageSection}>
                <View style={styles.packageHeader}>
                  <MaterialCommunityIcons
                    name="package-variant"
                    size={24}
                    color="#074799"
                  />
                  <Text style={styles.packageTitle}>What's in the Box</Text>
                </View>
                <View style={styles.packageList}>
                  <Text style={styles.packageItem}>• Rythmrix Device</Text>
                  <Text style={styles.packageItem}>• USB-C Charging Cable</Text>
                  <Text style={styles.packageItem}>• Quick Start Guide</Text>
                  <Text style={styles.packageItem}>• Warranty Card</Text>
                </View>
              </View>
            </View>
          )}
        </View>
      </ScrollView>

      {/* Bottom Buttons */}
      <View style={styles.bottomButtons}>
        <TouchableOpacity style={styles.cancelButton} onPress={handleCancel}>
          <Text style={styles.cancelButtonText}>Cancel</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.buyButton} onPress={handleBuy}>
          <Text style={styles.buyButtonText}>Buy</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  backButton: {
    padding: 8,
  },
  offerBanner: {
    backgroundColor: "#E8F1FF",
    padding: 12,
    // marginTop:64
  },
  offerText: {
    color: "#074799",
    fontSize: 14,
    textAlign: "center",
  },
  scrollView: {
    flex: 1,
  },
  slideContainer: {
    width: Dimensions.get("window").width,
    height: 400,
    justifyContent: "center",
    alignItems: "center",
  },
  slideImage: {
    width: "80%",
    height: "80%",
  },
  dotsContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginVertical: 16,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: "#ddd",
    marginHorizontal: 4,
  },
  activeDot: {
    backgroundColor: "#074799",
    width: 10,
    height: 10,
    borderRadius: 5,
  },
  productInfo: {
    padding: 20,
  },
  productTitle: {
    fontSize: 16,
    color: "#333",
    marginBottom: 8,
    lineHeight: 24,
  },
  productDescription: {
    fontSize: 14,
    color: "#666",
    marginBottom: 8,
    lineHeight: 20,
  },
  additionalInfo: {
    fontSize: 14,
    color: "#666",
    marginBottom: 16,
    lineHeight: 20,
  },
  ratingContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
  },
  ratingText: {
    fontSize: 14,
    color: "#333",
    marginLeft: 4,
    marginRight: 8,
  },
  ratingCount: {
    fontSize: 14,
    color: "#666",
  },
  priceContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  price: {
    fontSize: 20,
    fontWeight: "600",
    color: "#333",
    marginRight: 8,
  },
  originalPrice: {
    fontSize: 16,
    color: "#666",
    textDecorationLine: "line-through",
  },
  demoButton: {
    backgroundColor: "#6B7280",
    borderRadius: 12,
    padding: 16,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginVertical: 20,
  },
  demoContent: {
    flex: 1,
  },
  demoTitle: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "500",
    marginBottom: 4,
  },
  demoText: {
    color: "#fff",
    fontSize: 12,
    opacity: 0.8,
  },
  featuresGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginVertical: 20,
    gap: 12,
  },
  featureItem: {
    width: "48%",
    padding: 16,
    backgroundColor: "#F3F4F6",
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
    height: 80,
  },
  featureItemRight: {
    marginLeft: "auto",
  },
  featureItemBottom: {
    marginTop: 0,
  },
  featureIconContainer: {
    marginBottom: 8,
  },
  featureText: {
    fontSize: 12,
    color: "#333",
    textAlign: "center",
    fontWeight: "500",
  },
  tabContainer: {
    flexDirection: "row",
    marginBottom: 20,
    borderBottomWidth: 1,
    borderBottomColor: "#E5E7EB",
  },
  tab: {
    flex: 1,
    paddingVertical: 12,
  },
  activeTab: {
    borderBottomWidth: 2,
    borderBottomColor: "#074799",
  },
  tabText: {
    textAlign: "center",
    fontSize: 14,
    color: "#666",
  },
  activeTabText: {
    color: "#074799",
    fontWeight: "500",
  },
  tabContent: {
    paddingVertical: 20,
  },
  technologySection: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
  },
  technologyTitle: {
    fontSize: 16,
    fontWeight: "500",
    marginLeft: 12,
    color: "#333",
  },
  technologyDescription: {
    fontSize: 14,
    color: "#666",
    lineHeight: 20,
  },
  bottomButtons: {
    flexDirection: "row",
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: "#E5E7EB",
  },
  cancelButton: {
    flex: 1,
    paddingVertical: 12,
    marginRight: 2,
    borderWidth: 1,
    borderColor: "#074799",
    borderRadius: 5,
    alignItems: "center",
  },
  cancelButtonText: {
    color: "#074799",
    fontSize: 14,
    fontWeight: "500",
  },
  buyButton: {
    flex: 1,
    paddingVertical: 12,
    marginLeft: 8,
    backgroundColor: "#074799",
    borderRadius: 5,
    alignItems: "center",
  },
  buyButtonText: {
    color: "#fff",
    fontSize: 14,
    fontWeight: "500",
  },
  appSection: {
    backgroundColor: "#F5F5F5",
    padding: 20,
    borderRadius: 12,
    marginTop: 24,
    alignItems: "center",
  },
  appTitle: {
    fontSize: 20,
    color: "#074799",
    fontWeight: "600",
    marginBottom: 8,
  },
  appDescription: {
    fontSize: 14,
    color: "#666",
    textAlign: "center",
    marginBottom: 16,
  },
  storeButtons: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 20,
    marginTop: 8,
  },
  storeButton: {
    height: 40,
    width: 135, // Increased width for better visibility
  },
  storeImage: {
    height: '100%',
    width: '100%',
  },

  specSection: {
    marginBottom: 24,
  },
  specHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
  },
  specTitle: {
    fontSize: 16,
    fontWeight: "500",
    marginLeft: 12,
    color: "#333",
  },
  specItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: "#E5E7EB",
  },
  specLabel: {
    fontSize: 14,
    color: "#666",
  },
  specValue: {
    fontSize: 14,
    color: "#333",
    fontWeight: "500",
  },
  packageSection: {
    marginTop: 24,
  },
  packageHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
  },
  packageTitle: {
    fontSize: 16,
    fontWeight: "500",
    marginLeft: 12,
    color: "#333",
  },
  packageList: {
    paddingLeft: 12,
  },
  packageItem: {
    fontSize: 14,
    color: "#666",
    marginBottom: 8,
    lineHeight: 20,
  },
});

export default ProductDetailScreen;
