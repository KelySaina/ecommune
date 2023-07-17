import React, { useState, useRef } from 'react';
import { View, TextInput, TouchableOpacity, StyleSheet, Text, Animated } from 'react-native';
import { AntDesign } from '@expo/vector-icons';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [emailAnim] = useState(new Animated.Value(email === '' ? 0 : 1));
  const [passwordAnim] = useState(new Animated.Value(password === '' ? 0 : 1));

  const handleEmailChange = (text) => {
    setEmail(text);
    Animated.timing(emailAnim, {
      toValue: text !== '' ? 1 : 0,
      duration: 200,
      useNativeDriver: false,
    }).start();
  };

  const handlePasswordChange = (text) => {
    setPassword(text);
    Animated.timing(passwordAnim, {
      toValue: text !== '' ? 1 : 0,
      duration: 200,
      useNativeDriver: false,
    }).start();
  };

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const renderEmailPlaceholder = () => {
    if (email === '') {
      return null;
    }
    return (
      <Animated.Text
        style={[
          styles.placeholder,
          {
            transform: [{ translateY: emailAnim.interpolate({
              inputRange: [0, 1],
              outputRange: [22, 0],
            }) }],
            color: email !== '' ? '#2196F3' : '#666',
          },
        ]}
      >
        Email
      </Animated.Text>
    );
  };

  const renderPasswordPlaceholder = () => {
    if (password === '') {
      return null;
    }
    return (
      <Animated.Text
        style={[
          styles.placeholder,
          {
            transform: [{ translateY: passwordAnim.interpolate({
              inputRange: [0, 1],
              outputRange: [22, 0],
            }) }],
            color: password !== '' ? '#2196F3' : '#666',
          },
        ]}
      >
        Mot de passe
      </Animated.Text>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.inputContainer}>
        <AntDesign name="user" style={styles.icon} />
        {renderEmailPlaceholder()}
        <TextInput
          style={styles.input}
          placeholder="Email"
          onChangeText={handleEmailChange}
          value={email}
        />
      </View>
      <View style={styles.inputContainer}>
        <AntDesign name="lock" style={styles.icon} />
        {renderPasswordPlaceholder()}
        <TextInput
          style={styles.input}
          placeholder="Mot de passe"
          onChangeText={handlePasswordChange}
          value={password}
          secureTextEntry={!showPassword}
        />
        <TouchableOpacity onPress={toggleShowPassword} style={styles.eyeIcon}>
          <AntDesign
            name={showPassword ? 'eye' : 'eyeo'}
            style={styles.eyeIcon}
          />
        </TouchableOpacity>
      </View>
      <TouchableOpacity style={styles.loginButton} onPress={() => handleLogin()}>
        <Text style={styles.buttonText}>Connexion  </Text>
        <AntDesign name="login" style={styles.buttonIcon} />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 10,
    paddingHorizontal: 10,
    backgroundColor: '#fff',
  },
  icon: {
    fontSize: 20,
    marginRight: 10,
    color: '#666',
  },
  placeholder: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  input: {
    flex: 1,
    height: 40,
    paddingLeft: 10,
    fontSize: 16,
    color: '#333',
  },
  eyeIcon: {
    fontSize: 20,
    color: '#666',
    paddingRight: 10,
  },
  loginButton: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#2196F3',
    borderRadius: 10,
    width: 300,
    height: 40,
  },
  buttonIcon: {
    fontSize: 20,
    color: '#fff',
    marginRight: 5,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#fff',
  },
});

export default Login;
