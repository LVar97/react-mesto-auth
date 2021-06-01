import React from 'react';
import { withRouter } from 'react-router-dom';
import * as auth from './auth.js';
import InfoTooltip from './InfoTooltip';
import cross from '../image/cross.svg'

class Login extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      username: '',
      password: '',
      error: false
    }
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(e) {
    const {name, value} = e.target;
    this.setState({
      [name]: value
    });
  }

  handleSubmit(e){
    e.preventDefault();
    // здесь обрабатываем вход в систему
    if (!this.state.username || !this.state.password){
      return;
    }
    auth.authorize(this.state.username, this.state.password)
    .then((data) => {
      
      if (data.token){
        this.setState({
          username: '',
          password: ''
        }, () => {
          this.props.handleLogin();
          this.props.history.push('/main');
        })
      }  
    })
    .catch(err => {
      this.props.onInfoTooltip();
      console.log(err);
      this.setState({error: true})
    }); // запускается, если пользователь не найден
} 
  

  render(){
    return(
      <div className="access">
        <p className="access__welcome">
					Вход
        </p>
        <form onSubmit={this.handleSubmit} className="access__form">
          <input required id="username" className="access__email" name="username" placeholder="Email" type="text" value={this.state.username} onChange={this.handleChange} />
          <input required id="password" className="access__password" name="password" placeholder="Пароль" type="password" value={this.state.password} onChange={this.handleChange} />
          <button type="submit" className="access__link">Войти</button>
        </form>
        {this.state.error && <InfoTooltip
        onClose={this.props.onClose}
        src={cross}
        alt="не получилось("
        text = "Что-то пошло не так! Попробуйте ещё раз."
        name="tooltips"
        isOpen = {this.props.isOpen}
        />}
      </div>
    )
  }
}

export default withRouter(Login);