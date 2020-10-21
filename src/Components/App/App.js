import React from 'react';
import Slider from '../Slider';
import Card from '../Card';
import './app.scss';

const App = () => {
  return(
    <>
      <Slider>
        <Card>
          <img alt = 'test photo' src = 'https://gb4miass74.ru/wp-content/uploads/furamag-s-alkogolem-mozhno.png' />
        </Card>
        <Card>
          <video controls onClick = {e => e.preventDefault()}>
            <source src = 'http://htmlbook.ru/example/video/duel.ogv' type = 'video/ogg' />
            <source src = 'http://htmlbook.ru/example/video/duel.mp4' type = 'video/mp4' />
            <source src = 'http://htmlbook.ru/example/video/duel.webm' type = 'video/webm' />
          </video>
        </Card>
        <Card>
          <ul>
            <li>This</li>
            <li>is</li>
            <li>unordered</li>
            <li>list</li>
          </ul>
        </Card>
        <Card>
          <a href = '#' onClick = {e => e.preventDefault()}>Link</a>
        </Card>
        <Card>
          <textarea placeholder = 'textarea' />
        </Card>
      </Slider>
      <Slider>
        <Card>
          <input type = 'password' placeholder = 'input with type = password' />
        </Card>
        <Card>
          <button>Button</button>
        </Card>
        <Card>
          <canvas title = 'canvas' />
        </Card>
        <Card>
          <div>Slide</div>
        </Card>
        <Card>
          <select>
            <option>This</option>
            <option>is</option>
            <option>select</option>
          </select>
        </Card>
      </Slider>
    </>
  )
};

export default App;
