/* eslint-disable global-require */
import Mock from 'mockjs';

export default function () {
  Mock.mock(/\/charts$/, require('./data/charts.json'));
  Mock.mock(/\/charts\/1234/, require('./data/charts-1234.json'));
}
