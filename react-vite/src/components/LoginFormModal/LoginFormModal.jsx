import { useState } from "react";
import { thunkLogin } from "../../redux/session";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import * as sessionActions from '../../redux/session'
import { useNavigate } from "react-router-dom";
import "./LoginForm.css";

function LoginFormModal() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const { closeModal } = useModal();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const serverResponse = await dispatch(
      thunkLogin({
        email,
        password,
      })
    );

    if (serverResponse) {
      setErrors(serverResponse);
    } else {
      closeModal();
    }
  };

  const handleDemo = (e) => {
    e.preventDefault()
    return dispatch(sessionActions.thunkLogin({ email: 'demo@aa.io', password: 'password' }))
    .then(() => navigate('/'))
    .then(closeModal)
  }
  return (
    <div className="modal">
      <h1 className="modal-title">Log In</h1>
      <form onSubmit={handleSubmit}>
        <label className="modal-label">
          Email
          <input className="modal-input"
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </label>
        {errors.email && <p className="error-message">{errors.email}</p>}
        <label className="modal-label">
          Password
          <input className="modal-input"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </label>
        {errors.password && <p className="error-message">{errors.password}</p>}
        <button className='modal-button' type="submit">Log In</button>
      </form>
      <form onSubmit={handleDemo}>
        <div className='demo-button'>
          <button className='demo'type="submit">Login as Demo User</button>
        </div>
      </form>
    </div>
  );
}

export default LoginFormModal;
