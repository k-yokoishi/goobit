import React from 'react';
import { render } from 'react-native-testing-library';
import Home from '../Home';

describe('Home', () => {
  it('should have goal when goal is set', () => {
    const { getByText } = render(
      <Home goal={{ text: 'New My Goal' }} habits={[]} check={_ => _} />,
    );
    expect(getByText('New My Goal').props.children).toEqual('New My Goal');
  });
  it('should have default text when goal is not set', () => {
    const { getByText } = render(<Home goal={{ text: '' }} habits={[]} check={_ => _} />);
    expect(getByText('目標が設定されていません').props.children).toEqual(
      '目標が設定されていません',
    );
  });
});
