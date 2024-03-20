import React from 'react';
import { render } from '@testing-library/react';
import Card from './Card';


//Smoke Test:
it('renders without crashing', ()=>{
    render(<Card />)
});

//Snapshot Test:
it('matches snapshot', ()=>{
    const { asFragment } = render(
        <Card
            caption='test caption'
            src='test.jpg'
            currNum={1}
            totalNum={3}
        />
    );
    expect(asFragment()).toMatchSnapshot();

});

