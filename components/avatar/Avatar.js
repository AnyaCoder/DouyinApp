import React from 'react'
import { Image } from 'react-native'

const Avatar = ({ uri, size, border }) => {
    return (
        <Image
            source={{ uri }}
            style={{
                borderColor: 'black',
                borderWidth: border,
                borderRadius: size === 'big' ? 50 : 25,
                width: size === 'big' ? 100 : 50,
                height: size === 'big' ? 100 : 50,
            }} />
    )
}

// 设置默认属性值
Avatar.defaultProps = {
    size: 'sm',
    border: 0,
}

export default Avatar
