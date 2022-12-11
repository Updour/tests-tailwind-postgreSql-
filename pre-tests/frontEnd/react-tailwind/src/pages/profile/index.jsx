import { useState, useEffect } from 'react'
import {
  Card, CardHeader, CardBody, CardFooter, Typography, Avatar, Chip, Tooltip, Progress, Button,
  Dialog, DialogHeader, DialogBody, DialogFooter, Input
} from "@material-tailwind/react";
import { EllipsisVerticalIcon } from "@heroicons/react/24/outline";
import { authorsTableData, projectsTableData } from "@/data";
import axios from 'axios'
import _ from 'lodash'

export function Profiles() {
  const [data, setData] = useState([])
  const [open, setOpen] = useState(false);
  const [change, setChange] = useState(false);

  const [oid, setOid] = useState('')
  const [hp, setHp] = useState('')
  const [name, setName] = useState('')
  const [password, setPassword] = useState('')


  const handleOpen = () => setOpen(!open);


  const _onRetrieveDataProfile = async () => {
    try {
      let results = await axios.get(`http://localhost:8080/any-users`)
      if (_.isEqual(results.status, 201)) {
        setData(results.data.data)
      }
    }catch(e) {
      console.log(e)
    }
  }

  const _onInputProfiles = async () => {
    try {
     if (_.isEmpty(name) || _.isEmpty(password) || _.isEmpty(hp))
      return alert(`Form is required.`)
    let items = {
      name: name,
      password: password,
      hp: hp
    }
    let results = await axios.post(`http://localhost:8080/note-created`, items)
    if (_.isEqual(results.status, 201)) {
      alert('inputs successfully')
      setTimeout(() => setOpen(false), 1500)
    }else {
      alert('inputs unsuccessfully')
    }
  }catch(e) {
    console.log(e)
  }
}


   const _onChangeProfiles = async () => {
    try {
       if (_.isEmpty(name) || _.isEmpty(password) || _.isEmpty(hp))
        return alert(`Form is required.`)
      let items = {
        name: name,
        password: password,
        hp: hp
      }
      let results = await axios.put(`http://localhost:8080/note-updated/${oid}`, items)
      if (_.isEqual(results.status, 201)) {
        alert('updates successfully')
        setTimeout(() => setOpen(false), 1500)
      }else {
        alert('updates unsuccessfully')
      }
    }catch(e) {
      console.log(e)
    }
  }

   const _onRemovesProfiles = async (uuid) => {
    try {
      let results = await axios.delete(`http://localhost:8080/note-removed/${uuid}`)
      if (_.isEqual(results.status, 201)) {
        alert('deleted successfully')
        setTimeout(() => setOpen(false), 1500)
      }else {
        alert('deleted unsuccessfully')
      }
    }catch(e) {
      console.log(e)
    }
  }


  useEffect(() => {
    _onRetrieveDataProfile()
  })
  return (
    <div className="mt-12 mb-8 flex flex-col gap-12">
      <Card>
        <CardHeader variant="gradient" color="blue" className="mb-8 p-6">
          <Typography variant="h6" color="white">
            Profiles Table
          </Typography>
        </CardHeader>
        <CardBody className="overflow-x-scroll px-0 pt-0 pb-2">
         <Button variant="gradient" className="mb-8 ml-6"
         onClick={() => {
          setOpen(true)
          setChange(false)}}
          >Tambah</Button>
          <table className="w-full min-w-[640px] table-auto">
            <thead>
              <tr>
                {["username", "No Handphone", "password", "Action"].map((el) => (
                  <th
                    key={el}
                    className="border-b border-blue-gray-50 py-3 px-5 text-left"
                  >
                    <Typography
                      variant="small"
                      className="text-[11px] font-bold uppercase text-blue-gray-400"
                    >
                      {el}
                    </Typography>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {data.map((items, key) => {
                  const className =  "py-3 px-5"
                  return (
                    <tr key={key}>
                      <td className={className}>
                        <Typography className="text-xs font-semibold text-blue-gray-600">
                          {items.name}
                        </Typography>
                      </td>
                      <td className={className}>
                        <Typography className="text-xs font-semibold text-blue-gray-600">
                          {items.hp}
                        </Typography>
                      </td>
                      <td className={className}>
                        <Typography className="text-xs font-semibold text-blue-gray-600">
                          {items.password}
                        </Typography>
                      </td>
                      <td className={className}>
                        <Typography
                          as="a"
                          href='#'
                          className="text-xs font-semibold text-blue-gray-600"
                          onClick={() => {
                            setOpen(true)
                            setChange(true)
                            setHp(items.hp)
                            setName(items.name)
                            setPassword(items.password)
                            setOid(items.id)
                          }}
                            >
                          Edit
                        </Typography>
                        <Typography
                          as="a"
                          href="#"
                          className="text-xs font-semibold text-blue-gray-600"
                          onClick={() => _onRemovesProfiles(items.id)}
                        >
                          Hapus
                        </Typography>
                      </td>
                    </tr>
                  );
                }
              )}
            </tbody>
          </table>
        </CardBody>
      </Card>
        <Dialog open={open} handler={handleOpen} size="lg">
        <DialogHeader>Input new profile</DialogHeader>
        <DialogBody divider >
          <div className="m-2">
            <Input label="No Handphone" size="lg"
            onChange={e => setHp(e.target.value)}
            value={hp}/>
            </div>
            <div className="m-2">
            <Input type="text" label="Username" size="lg"
            onChange={e => setName(e.target.value)}
            value={name}/>
            </div>
            <div className="m-2">
            <Input type="password" label="Password" size="lg"
            onChange={e => setPassword(e.target.value)}
            value={password}/>
            </div>
        </DialogBody>
        <DialogFooter>
          <Button
            variant="text"
            color="red"
            onClick={handleOpen}
            className="mr-1"
          >
            <span>Cancel</span>
          </Button>
          {
            change ?
            <Button variant="gradient" color="blue" onClick={_onChangeProfiles}>
            <span>Update</span>
          </Button> :
          <Button variant="gradient" color="green" onClick={_onInputProfiles}>
            <span>Save</span>
          </Button>
          }
        </DialogFooter>
      </Dialog>
    </div>
  );
}

export default Profiles;
