import React from 'react'
import {
  TextProps,
  TouchableOpacity,
  TouchableOpacityProps,
  ViewStyle
} from 'react-native'
import { Ionicons } from '@expo/vector-icons'

interface IconProps extends TextProps {
  name: React.ComponentProps<typeof Ionicons>['name']
}

interface ButtonProps<T extends boolean> extends TouchableOpacityProps {
  children?: React.ReactNode
  useIcon: T
  name: T extends true
    ? React.ComponentProps<typeof Ionicons>['name']
    : undefined
  size?: number
  color?: string
  styleIcon?: ViewStyle
}

const ButtonIoniconsCustomizable: React.FC<ButtonProps<boolean>> = ({
  children,
  useIcon,
  name,
  size,
  color,
  styleIcon,
  ...rest
}) => {
  if (useIcon) {
    return (
      <TouchableOpacity {...rest}>
        <Ionicons name={name} size={size} color={color} style={styleIcon} />
        {children}
      </TouchableOpacity>
    )
  }

  return <TouchableOpacity {...rest}>{children}</TouchableOpacity>
}

export default ButtonIoniconsCustomizable
