import Mock from 'mockjs';

import charts from './data/charts';

export default function () {
  Mock.mock(/charts/, charts);
}
