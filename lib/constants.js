import { Dimensions } from 'react-native';

const sizeRatio = Dimensions.get('window').width < 500 ? 1 : 1.6;
const validScores = [0, '½', 1, 2, 3, 5, 8, 13, 20, 40, 100, '❓', '🐞', '☕'];

export { sizeRatio, validScores };
