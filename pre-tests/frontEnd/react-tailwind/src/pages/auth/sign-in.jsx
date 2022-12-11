import { useState } from 'react'
import { Link, useNavigate } from "react-router-dom";
import {
  Card, CardHeader, CardBody, CardFooter, Input, Checkbox, Button, Typography,
} from "@material-tailwind/react";
import axios from 'axios'
import _ from 'lodash'


export function SignIn() {
  const route = useNavigate()
  const [name, setName] = useState('')
  const [password, setPassword] = useState('')


  const _onTheWayToDashboard = async () => {
    try {
      if (_.isEmpty(name) || _.isEmpty(password)) return alert(`Form is required.`)
      let results = await axios.get(`http://localhost:8080/agri-auth/${name}/${password}`)
      if (_.isEqual(results.data.data.length, 1)) {
        localStorage.setItem('@keyB!AsaDulu', JSON.stringify(results.data.data))
        alert('logged in successfully')
        setTimeout(() => route('/dashboard/home'), 2500)
      }else {
        alert('logged in unsuccessfully')
      }
    }catch(e) {
      console.log(e)
    }
  }

  return (
    <>
      <div className="absolute inset-0 z-0 h-full w-full bg-black/50" />
      <div className="container mx-auto p-4">
        <Card className="absolute top-2/4 left-2/4 w-full max-w-[24rem] -translate-y-2/4 -translate-x-2/4">
          <CardHeader
            variant="gradient"
            color="blue"
            className="mb-4 grid h-28 place-items-center"
          >
            <Typography variant="h3" color="white">
              Sign In
            </Typography>
          </CardHeader>
          <CardBody className="flex flex-col gap-4">
            <Input type="text" label="Username" size="lg"
            onChange={e => setName(e.target.value)}/>
            <Input type="password" label="Password" size="lg"
            onChange={e => setPassword(e.target.value)}/>
            <div className="-ml-2.5">
              <Checkbox label="Remember Me" />
            </div>
          </CardBody>
          <CardFooter className="pt-0">
            <Button variant="gradient" fullWidth onClick={_onTheWayToDashboard}>
              Sign In
            </Button>
            <Typography variant="small" className="mt-6 flex justify-center">
              Don't have an account?
              <Link to="/auth/sign-up">
                <Typography
                  as="span"
                  variant="small"
                  color="blue"
                  className="ml-1 font-bold"
                >
                  Sign up
                </Typography>
              </Link>
            </Typography>
          </CardFooter>
        </Card>
      </div>
    </>
  );
}

export default SignIn;
