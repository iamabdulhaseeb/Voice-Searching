import React, { useState, useEffect } from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  View,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import Voice from '@react-native-voice/voice';

const productsData = [
  {
    id: 1,
    name: "Steel Plate",
    category: "Plate",
    price: 50.99,
    stock: 100,
    description: "High-quality steel plate for industrial applications."
  },
  {
    id: 2,
    name: "Aluminum Rod",
    category: "Rod",
    price: 25.5,
    stock: 200,
    description: "Durable aluminum rod suitable for construction."
  },
  {
    id: 3,
    name: "Copper Wire",
    category: "Wire",
    price: 10.75,
    stock: 150,
    description: "Flexible copper wire for electrical installations."
  },
  {
    id: 4,
    name: "Brass Fittings",
    category: "Fittings",
    price: 8.99,
    stock: 300,
    description: "Various brass fittings for plumbing."
  },
  {
    id: 5,
    name: "Titanium Sheet",
    category: "Sheet",
    price: 120.0,
    stock: 75,
    description: "Corrosion-resistant titanium sheet for aerospace."
  },
  {
    id: 6,
    name: "Nickel Alloy Pipe",
    category: "Pipe",
    price: 45.25,
    stock: 120,
    description: "High-strength nickel alloy pipe for industrial use."
  },
  {
    id: 7,
    name: "Zinc Coils",
    category: "Coils",
    price: 15.0,
    stock: 180,
    description: "Galvanized zinc coils for roofing applications."
  },
  {
    id: 8,
    name: "Lead Blocks",
    category: "Blocks",
    price: 30.75,
    stock: 90,
    description: "Heavy lead blocks for radiation shielding."
  },
  {
    id: 9,
    name: "Magnesium Bar",
    category: "Bar",
    price: 18.5,
    stock: 250,
    description: "Lightweight magnesium bar for automotive parts."
  },
  {
    id: 10,
    name: "Tungsten Rod",
    category: "Rod",
    price: 85.0,
    stock: 100,
    description: "High-density tungsten rod for industrial machining."
  },
  {
    id: 11,
    name: "Silver Sheet",
    category: "Sheet",
    price: 200.0,
    stock: 50,
    description: "Pure silver sheet for jewelry making."
  },
  {
    id: 12,
    name: "Steel Nails",
    category: "Nails",
    price: 5.99,
    stock: 500,
    description: "Common steel nails for construction."
  },
  {
    id: 13,
    name: "Aluminum Foil",
    category: "Foil",
    price: 3.5,
    stock: 1000,
    description: "Thin aluminum foil for packaging."
  },
  {
    id: 14,
    name: "Copper Tubing",
    category: "Tubing",
    price: 12.25,
    stock: 150,
    description: "Flexible copper tubing for HVAC systems."
  },
  {
    id: 15,
    name: "Brass Bolts",
    category: "Bolts",
    price: 7.75,
    stock: 300,
    description: "Sturdy brass bolts for machinery."
  },
  {
    id: 16,
    name: "Titanium Screws",
    category: "Screws",
    price: 15.0,
    stock: 200,
    description: "Corrosion-resistant titanium screws for marine use."
  },
  {
    id: 17,
    name: "Nickel Plating",
    category: "Plating",
    price: 20.99,
    stock: 150,
    description: "Nickel plating solution for electroplating."
  },
  {
    id: 18,
    name: "Zinc Sheet",
    category: "Sheet",
    price: 18.5,
    stock: 180,
    description: "Galvanized zinc sheet for roofing."
  },
  {
    id: 19,
    name: "Lead Pipes",
    category: "Pipes",
    price: 40.0,
    stock: 120,
    description: "Lead pipes for plumbing applications."
  },
  {
    id: 20,
    name: "Magnesium Alloy",
    category: "Alloy",
    price: 25.99,
    stock: 200,
    description: "Durable magnesium alloy for aerospace components."
  },
  {
    id: 21,
    name: "Tungsten Carbide",
    category: "Carbide",
    price: 150.0,
    stock: 80,
    description: "Hard tungsten carbide for cutting tools."
  },
  {
    id: 22,
    name: "Silver Bars",
    category: "Bars",
    price: 250.0,
    stock: 50,
    description: "Pure silver bars for investment."
  },
  {
    id: 23,
    name: "Steel Tubes",
    category: "Tubes",
    price: 30.5,
    stock: 300,
    description: "Various steel tubes for structural applications."
  },
  {
    id: 24,
    name: "Aluminum Profiles",
    category: "Profiles",
    price: 12.75,
    stock: 250,
    description: "Custom aluminum profiles for construction."
  },
  {
    id: 25,
    name: "Copper Plates",
    category: "Plates",
    price: 25.0,
    stock: 150,
    description: "Heavy copper plates for industrial use."
  },
  {
    id: 26,
    name: "Brass Sheets",
    category: "Sheets",
    price: 15.99,
    stock: 200,
    description: "Flexible brass sheets for decorative applications."
  },
  {
    id: 27,
    name: "Titanium Alloys",
    category: "Alloys",
    price: 80.0,
    stock: 100,
    description: "Strong titanium alloys for aerospace and medical devices."
  },
  {
    id: 28,
    name: "Nickel Wire",
    category: "Wire",
    price: 18.25,
    stock: 180,
    description: "Nickel wire for electrical resistance."
  },
  {
    id: 29,
    name: "Zinc Coatings",
    category: "Coatings",
    price: 10.5,
    stock: 300,
    description: "Protective zinc coatings for corrosion prevention."
  },
  {
    id: 30,
    name: "Lead Alloys",
    category: "Alloys",
    price: 35.0,
    stock: 120,
    description: "Lead alloys for battery manufacturing."
  },
];

const App = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [isListening, setIsListening] = useState(false);
  const [filteredProducts, setFilteredProducts] = useState([]);

  useEffect(() => {
    setFilteredProducts(productsData); // Initialize with all products
    Voice.onSpeechResults = onSpeechResults;
    Voice.onSpeechError = onSpeechError;
    return () => {
      Voice.destroy().then(Voice.removeAllListeners);
    };
  }, []);

  const startSpeechRecognition = async () => {
    try {
      setSearchTerm('');
      setIsListening(true);
      await Voice.start('en-US');
    } catch (error) {
      console.error('Error starting speech recognition', error);
    }
  };

  const onSpeechResults = (e) => {
    let string = '';
    for (var a=0;a<e?.value?.length;a++) {
      string += e?.value[a];
    }
    setSearchTerm(string);
    setIsListening(false);
    performSearch(string);
  };

  const onSpeechError = (e) => {
    console.error('Speech recognition error:', e.error);
    setIsListening(false);
  };

  const stopSpeechRecognition = async () => {
    try {
      await Voice.stop();
      setIsListening(false);
    } catch (error) {
      console.error('Error stopping speech recognition', error);
    }
  };

  const performSearch = (text) => {
    const filtered = productsData.filter(
      product =>
        product.name?.toLowerCase().includes(text?.toLowerCase()) ||
        product.category?.toLowerCase().includes(text?.toLowerCase()) ||
        product.price.toString().includes(text?.toLowerCase()) ||
        product.stock.toString().includes(text?.toLowerCase())
    );
    setFilteredProducts(filtered);
  };

  const handleSearch = (text) => {
    setSearchTerm(text);
    performSearch(text);
  };

  const renderProducts = () => {
    if (filteredProducts.length === 0) {
      return <Text>No products found</Text>;
    }

    return filteredProducts.map(product => (
      <View key={product.id} style={styles.productCard}>
        <Text style={styles.productName}>{product.name}</Text>
        <Text style={styles.productCategory}>Category: {product.category}</Text>
        <Text style={styles.productDetails}>
          Price: ${product.price?.toFixed(2)} | Stock: {product.stock}
        </Text>
        <Text style={styles.productDescription}>{product.description}</Text>
      </View>
    ));
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Metal Industry Products</Text>
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.input}
          placeholder="Search by name, category, price, or stock..."
          onChangeText={handleSearch}
          value={searchTerm}
        />
        <TouchableOpacity
          style={styles.voiceButton}
          onPressIn={startSpeechRecognition}
          onPressOut={stopSpeechRecognition}
          activeOpacity={0.6}
        >
          <Text style={styles.voiceButtonText}>
            {isListening ? 'Listening...' : 'Voice Search'}
          </Text>
        </TouchableOpacity>
      </View>
      <View style={styles.productsList}>
        <ScrollView contentContainerStyle={{flexGrow:1}}>
        {renderProducts()}
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  input: {
    flex: 1,
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    paddingHorizontal: 10,
    marginRight: 10,
  },
  voiceButton: {
    backgroundColor: '#007BFF',
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 5,
  },
  voiceButtonText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  productsList: {
    flex: 1,
    marginTop: 10,
  },
  productCard: {
    backgroundColor: '#F0F0F0',
    padding: 10,
    marginBottom: 10,
    borderRadius: 5,
  },
  productName: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  productCategory: {
    fontStyle: 'italic',
    marginBottom: 5,
  },
  productDetails: {
    marginBottom: 5,
  },
  productDescription: {
    fontSize: 12,
  },
});

export default App;