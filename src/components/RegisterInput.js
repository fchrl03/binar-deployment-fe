import React from 'react';

function RegisterInput({ name, email, password, onSubmit }) {
  <div>
    <form onSubmit={onSubmit}>
      <div>
        Name: <input type="text" onChange={name} placeholder="Input Name" />
      </div>
      <div>
        Email: <input type="email" onChange={email} placeholder="Input Email" />
      </div>
      <div>
        Password: <input type="text" onChange={password} placeholder="Input Password" />
      </div>
      <div>
        <button type="submit">Submit</button>
      </div>
    </form>
  </div>;
}

export default RegisterInput;
