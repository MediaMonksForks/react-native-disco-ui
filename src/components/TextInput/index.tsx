import * as React from 'react';
import { Fragment, memo, useMemo, useState } from 'react';
import {
  Text,
  TextInput as RNTextInput,
  TextInputProps,
  TextProps,
  TextStyle,
  View,
  ViewStyle,
} from 'react-native';

import Button from '../Button';
import styles from './textInput.style';

interface Props extends TextInputProps {
  // Title props
  title?: string;
  titleStyle?: TextStyle;
  titleProps?: TextProps;
  // TextInput props
  style?: ViewStyle;
  getRef?: (e: RNTextInput | null) => void;
  isPassword: boolean;
  isSecureTextEntry?: boolean;
  // Error props
  errorInputStyle?: ViewStyle;
  errorTitle?: string;
  errorTitleStyle?: TextStyle;
  errorTitleProps?: TextProps;
  hasError?: boolean;
  // Show Password props
  showPasswordButton?: boolean;
  showPasswordButtonStyle?: ViewStyle;
  showPasswordTitle?: string;
  showPasswordTitleStyle?: TextStyle;
  hidePasswordTitle?: string;
  renderShowPasswordContent?: () => React.ReactNode;
  renderHidePasswordContent?: () => React.ReactNode;
  // Additional props
  containerStyle?: ViewStyle;
  renderBorderView?: () => React.ReactNode;
  renderLeftContent?: () => React.ReactNode;
  renderRightContent?: () => React.ReactNode;
}

const TextInput = ({
  // Title props
  title,
  titleStyle,
  titleProps,
  // TextInput props
  style,
  getRef,
  isPassword,
  isSecureTextEntry,
  // Additional props
  containerStyle,
  renderBorderView,
  renderLeftContent,
  renderRightContent,
  // Error Props
  hasError,
  errorInputStyle,
  errorTitle,
  errorTitleStyle,
  errorTitleProps,
  // Show Password Props
  showPasswordButton,
  showPasswordButtonStyle,
  showPasswordTitle,
  showPasswordTitleStyle,
  hidePasswordTitle,
  renderShowPasswordContent,
  renderHidePasswordContent,
  ...props
}: Props) => {
  const [isSecureText, setIsSecureText] = useState<boolean>(isPassword);

  const Container = useMemo(
    () => (showPasswordButton || containerStyle ? View : Fragment),
    [containerStyle, showPasswordButton],
  );

  const defaultContainerStyle = useMemo(
    () => ({
      ...(containerStyle
        ? {
            style: containerStyle,
          }
        : undefined),
    }),
    [containerStyle],
  );

  return (
    <>
      {!!title && (
        <Text style={titleStyle} {...titleProps}>
          {title}
        </Text>
      )}
      <Container {...defaultContainerStyle}>
        {renderLeftContent && renderLeftContent()}
        <RNTextInput
          style={[
            style || styles.container,
            hasError && (errorInputStyle || styles.errorInputContainer),
          ]}
          ref={getRef}
          secureTextEntry={isSecureTextEntry || isSecureText}
          {...props}
        />
        {renderRightContent && renderRightContent()}
        {showPasswordButton && (
          <Button
            androidRipple={{}}
            style={showPasswordButtonStyle || styles.showPasswordButton}
            titleStyle={showPasswordTitleStyle}
            title={
              !renderShowPasswordContent
                ? isSecureText
                  ? showPasswordTitle || 'show'
                  : hidePasswordTitle || 'hide'
                : undefined
            }
            onPress={() => setIsSecureText(!isSecureText)}
          >
            {isSecureText
              ? renderShowPasswordContent && renderShowPasswordContent()
              : renderHidePasswordContent && renderHidePasswordContent()}
          </Button>
        )}
      </Container>
      {renderBorderView && renderBorderView()}
      {hasError && errorTitle && (
        <Text style={errorTitleStyle} {...errorTitleProps}>
          {errorTitle}
        </Text>
      )}
    </>
  );
};

export default memo(TextInput);
