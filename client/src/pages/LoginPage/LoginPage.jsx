import classes from './LoginPage.module.css';

const LoginPage = () => {
  return (
    <div className={classes['login-container']}>
      <h2>Login</h2>
      <form action="/login" method="post">
        <div className="form-group">
          <input 
            type="text" 
            id="username" 
            name="username" 
            placeholder="Username" 
            className="form-control"
            required 
          />
        </div>
        <div className="form-group">
          <input 
            type="password" 
            id="password" 
            name="password" 
            placeholder="Password" 
            className="form-control"
            required 
          />
        </div>
        
        <button type="submit" className="btn btn-primary btn-block">Login</button>
        <a href="/register" className={classes['register-link']}>{`Don't have an account? Register`}</a>
      </form>
    </div>
  );
};

export default LoginPage;
