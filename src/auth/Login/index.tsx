import React, { useState, useEffect, useRef } from "react";
import { View, Keyboard, StyleSheet, Alert } from "react-native";
import { useAuth } from "../../contexts/AuthContext";
import ButtonGeneric from "../../components/ButtonGeneric";
import TextGeneric from "../../components/TextGeneric";
import { TextInput } from "react-native-paper";
import { TouchableOpacity } from "react-native-gesture-handler";
import Google from "../../../assets/googleIcon.svg";
import { useNavigation } from "@react-navigation/native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useForm, Controller } from "react-hook-form"; // Importa React Hook Form
import { authUser } from "../../services/authService";

const LoginScreen = () => {
  const { login } = useAuth();
  const navigation = useNavigation<any>();
  const [loading, setLoading] = useState(false);
  const [isKeyboardVisible, setKeyboardVisible] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  // Configurações do React Hook Form
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const passwordInputRef = useRef<any>(null);

  const handleLogin = async (data: { email: string; password: string }) => {
    try {
      const authPromise = authUser(data);

      setLoading(true);

      const result = await authPromise;

      setLoading(false);

      const newUser = {
        ...result.data,
        expiresIn: Math.floor(Date.now() / 1000) + result?.data?.expiresIn,
      };
      
      login(newUser);

    } catch (error: any) {
      console.log(error)
      setLoading(false);
      const errors = error.response.data?.notifications;
      for (let err of errors) {
        Keyboard.dismiss();
        control.setError("email", { message: "" });
        control.setError("password", { message: err.message.value });
      }
    }
  };

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      "keyboardDidShow",
      () => {
        setKeyboardVisible(true);
      }
    );
    const keyboardDidHideListener = Keyboard.addListener(
      "keyboardDidHide",
      () => {
        setKeyboardVisible(false);
      }
    );

    return () => {
      keyboardDidHideListener.remove();
      keyboardDidShowListener.remove();
    };
  }, []);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <View style={styles.container}>
      {!isKeyboardVisible && (
        <ButtonGeneric
          onPress={() => navigation.navigate("Welcome")}
          outline
          size={20}
          icon="arrow-left"
        />
      )}
      <View style={{ marginVertical: 32 }}>
        <TextGeneric size={28}>Bem vindo de volta!</TextGeneric>
        <TextGeneric size={28}>Que bom ver você.</TextGeneric>
      </View>

      <View>
        {/* Controlador para o campo de e-mail */}
        <Controller
          control={control}
          name="email"
          rules={{ required: "O e-mail é obrigatório" }}
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              mode="outlined"
              label="Insira seu e-mail"
              textContentType="emailAddress"
              style={{ fontSize: 18, height: 56 }}
              returnKeyType="next"
              onSubmitEditing={() => passwordInputRef.current?.focus()}
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
              error={!!errors.email}
            />
          )}
        />
        {errors.email && (
          <TextGeneric size={14} color="#FF0000">
            {errors.email.message}
          </TextGeneric>
        )}

        {/* Controlador para o campo de senha */}
        <Controller
          control={control}
          name="password"
          rules={{ required: "A senha é obrigatória" }}
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              mode="outlined"
              label="Senha"
              textContentType="password"
              secureTextEntry={!showPassword}
              style={{ fontSize: 18, height: 56, marginTop: 12 }}
              returnKeyType="done"
              ref={passwordInputRef}
              right={
                <TextInput.Icon
                  onPress={togglePasswordVisibility}
                  icon={showPassword ? "eye-off" : "eye"}
                />
              }
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
              error={!!errors.password}
            />
          )}
        />
        {errors.password && (
          <TextGeneric size={14} color="#FF0000">
            {errors.password.message}
          </TextGeneric>
        )}

        <View
          style={{
            width: "100%",
            display: "flex",
            alignItems: "flex-end",
            marginTop: 12,
          }}
        >
          <TouchableOpacity>
            <TextGeneric weight={400} size={14}>
              Esqueceu a senha?
            </TextGeneric>
          </TouchableOpacity>
        </View>
      </View>

      <ButtonGeneric
        style={{ marginTop: 32 }}
        full
        loading={loading}
        text="Entrar"
        onPress={handleSubmit(handleLogin as any)}
      />

      <View style={{ flex: 0.2, marginVertical: 32 }}>
        <View style={styles.divisorWrapper}>
          <View style={styles.divisor}></View>
          <TextGeneric weight={300}>Ou</TextGeneric>
          <View style={styles.divisor}></View>
        </View>
      </View>

      <TouchableOpacity style={styles.btnGoogle}>
        <Google height={26} />
        <TextGeneric color="#333">Entre com Google</TextGeneric>
      </TouchableOpacity>

      <View style={styles.registerWrapper}>
        <View style={styles.register}>
          <TextGeneric size={16} weight={300}>
            Não tem uma conta?
          </TextGeneric>
          <TouchableOpacity>
            <TextGeneric size={16} weight={500} color="#05A3FF">
              Cadastre-se
            </TextGeneric>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#171719",
    padding: 24,
    position: "relative",
    justifyContent: "flex-start",
  },
  divisorWrapper: {
    display: "flex",
    marginTop: 10,
    gap: 12,
    flexDirection: "row",
    flex: 1,
    alignItems: "center",
  },
  divisor: {
    backgroundColor: "#FFF",
    flex: 0.5,
    flexDirection: "row",
    alignItems: "flex-start",
    height: 1,
  },
  btnGoogle: {
    backgroundColor: "#FFF",
    borderRadius: 10,
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 10,
    paddingVertical: 18,
  },
  registerWrapper: {
    position: "absolute",
    bottom: 15,
    width: "100%",
  },
  register: {
    marginLeft: 60,
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    gap: 5,
  },
});

export default LoginScreen;
