import React, {useState} from 'react';
import {View, TextInput, TouchableOpacity, Text, StyleSheet} from 'react-native';
import {COLORS} from '../constants';

interface Props {
  onSearch: (keyword: string) => void;
  placeholder?: string;
}

export const SearchBar: React.FC<Props> = ({
  onSearch,
  placeholder = '사진관 이름이나 주소를 검색해보세요',
}) => {
  const [text, setText] = useState('');

  const handleSubmit = () => {
    const trimmed = text.trim();
    if (trimmed.length > 0) {
      onSearch(trimmed);
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        value={text}
        onChangeText={setText}
        placeholder={placeholder}
        placeholderTextColor={COLORS.textTertiary}
        returnKeyType="search"
        onSubmitEditing={handleSubmit}
      />
      <TouchableOpacity style={styles.button} onPress={handleSubmit}>
        <Text style={styles.buttonText}>검색</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 16,
    marginVertical: 8,
    gap: 8,
  },
  input: {
    flex: 1,
    height: 44,
    backgroundColor: COLORS.surface,
    borderRadius: 12,
    paddingHorizontal: 16,
    fontSize: 14,
    color: COLORS.text,
  },
  button: {
    height: 44,
    paddingHorizontal: 16,
    backgroundColor: COLORS.primary,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '600',
  },
});
