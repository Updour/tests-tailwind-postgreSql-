import { Link, useNavigate } from "react-router-dom";
import { useState } from 'react'

import {
  Card, CardHeader, CardBody, CardFooter, Input, Checkbox, Button, Typography,
} from "@material-tailwind/react";
import axios from 'axios'
import _ from 'lodash'


export function SignUp() {
  const route = useNavigate()
  const [hp, setHp] = useState('')
  const [name, setName] = useState('')
  const [password, setPassword] = useState('')

  const _onTheWayToDashboardLiveOnSigIns = async () => {
    try {
       if (_.isEmpty(name) || _.isEmpty(password) || _.isEmpty(hp)) return alert(`Form is required.`)
      let items = {
        name: name,
        password: password,
        hp: hp
      }
      let results = await axios.post(`http://localhost:8080/note-created`, items)
      if (_.isEqual(results.status, 201)) {
        localStorage.setItem('@keyB!AsaDulu', JSON.stringify(results.data.data))
        alert('sign up in successfully')
        setTimeout(() => route('/dashboard/home'), 2500)
      }else {
        alert('sign up in unsuccessfully')
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
              Sign Up
            </Typography>
          </CardHeader>
          <CardBody className="flex flex-col gap-4">
            <Input label="No Handphone" size="lg"
            onChange={e => setHp(e.target.value)}/>
            <Input type="text" label="Username" size="lg"
            onChange={e => setName(e.target.value)}/>
            <Input type="password" label="Password" size="lg"
            onChange={e => setPassword(e.target.value)}/>
            <div className="-ml-2.5">
              <Checkbox label="I agree the Terms and Conditions" />
            </div>
          </CardBody>
          <CardFooter className="pt-0">
            <Button variant="gradient" fullWidth onClick={_onTheWayToDashboardLiveOnSigIns}>
              Sign Up
            </Button>
            <Typography variant="small" className="mt-6 flex justify-center">
              Already have an account?
              <Link to="/auth/sign-in">
                <Typography
                  as="span"
                  variant="small"
                  color="blue"
                  className="ml-1 font-bold"
                >
                  Sign in
                </Typography>
              </Link>
            </Typography>
          </CardFooter>
        </Card>
      </div>
    </>
  );
}

export default SignUp;
