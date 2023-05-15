import React, {memo} from 'react';
import {StyleProp, TouchableOpacity, View, ViewStyle} from 'react-native';
import FastImage, {ImageStyle} from 'react-native-fast-image';
import {LocalImage} from '../../models/types';
import TextWrapper from '../TextWrapper';
import {styles} from './styles';

const crossIcon = require('../../assets/images/cross-sign.png');

interface ImageGalleryProps {
  images: LocalImage[];
  label?: string;
  limit?: number;
  deleteImage?: (image: LocalImage) => void;
  onAddPress?: () => void;
  style?: StyleProp<ViewStyle>;
  imageStyleContainer?: StyleProp<ImageStyle>;
  imageStyle?: StyleProp<ImageStyle>;
}

const ImageGallery = ({
  images,
  label,
  limit,
  deleteImage,
  style,
  imageStyle,
  imageStyleContainer,
  onAddPress,
}: ImageGalleryProps) => {
  const canAddMoreImages = !limit || limit > images?.length;

  const showAddButton = onAddPress && canAddMoreImages;

  return (
    <View>
      {!!label && <TextWrapper style={styles.label}>{label}</TextWrapper>}
      <View style={[styles.imagesContainer, style]}>
        {showAddButton && (
          <View style={styles.imageContainer}>
            <TouchableOpacity style={styles.flexCenter} onPress={onAddPress}>
              <View style={styles.addBtn}>
                <TextWrapper style={styles.addSign}>+</TextWrapper>
              </View>
            </TouchableOpacity>
          </View>
        )}
        {images.map(image => {
          const {mime, data, localIdentifier, modificationDate} = image;
          const base64Image = `data:${mime};base64,${data}`;

          return (
            <View
              key={localIdentifier || modificationDate}
              style={[styles.imageContainer, imageStyleContainer]}>
              <FastImage
                resizeMode={FastImage.resizeMode.cover}
                style={[styles.image, imageStyle]}
                source={{uri: base64Image}}
              />
              {deleteImage && (
                <TouchableOpacity
                  style={styles.deleteButton}
                  onPress={() => deleteImage(image)}>
                  <FastImage style={styles.deleteImage} source={crossIcon} />
                </TouchableOpacity>
              )}
            </View>
          );
        })}
      </View>
    </View>
  );
};

export default memo(ImageGallery);
