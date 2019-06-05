/* eslint-disable global-require */
import Mock from 'mockjs';

export default function () {
  Mock.mock(/\/chart$/, require('./data/charts.json'));
  Mock.mock(/\/chart\/1234/, require('./data/charts-1234.json'));
}
