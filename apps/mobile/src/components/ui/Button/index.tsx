import React from 'react'
import { TouchableOpacity, TouchableOpacityProps, View } from 'react-native'

interface ButtonProps extends TouchableOpacityProps {
  children?: React.ReactNode
}
const Button: React.FC<ButtonProps> = ({ children, ...rest }) => {
  return <TouchableOpacity {...rest}>{children}</TouchableOpacity>
}

export default Button
