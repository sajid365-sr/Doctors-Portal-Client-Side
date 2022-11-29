
import { useQuery } from '@tanstack/react-query';
import React, { useContext } from 'react';
import toast from 'react-hot-toast';
import { AuthContext } from '../../../contexts/AuthProvider';

const AllUsers = () => {
    const {logOut} = useContext(AuthContext);


    const { data: users = [], refetch } = useQuery({
        queryKey:['users'],
        queryFn: async() => {
            const res = await fetch('https://doctors-portal-server-side-gray.vercel.app/users',{
                headers:{
                    authorization: `Bearer ${localStorage.getItem('AccessToken')}`
                }
            });
            const data = await res.json()
            if(data.message === 'Forbidden access'){
                logOut()
                .then( () =>{
        
                })
                .catch(err => console.error(err))
              }
            return data;
        } 
    })

const handleMakeAdmin = (id) =>{
    fetch(`https://doctors-portal-server-side-gray.vercel.app/users/admin/${id}`, {
        method:'put',
        headers:{
            authorization : `bearer ${localStorage.getItem('AccessToken')}`
        }
    })
    .then(res => res.json())
    .then(data => {
        
        if(data.modifiedCount > 0){
            toast.success('Make admin successfully')
            refetch();
        }
    })
}

    return (
        <div>
            <h2 className="text-3xl mb-8">All Users</h2>

            <div className="overflow-x-auto">
  <table className="table w-full">
    
    <thead>
      <tr>
        <th></th>
        <th>Name</th>
        <th>Email</th>
        <th>Role</th>
        <th>Action</th>
      </tr>
    </thead>
    <tbody>
      
    
      {
          users?.map((user,i) => <tr key={user._id} className="hover">
          
          <td>{i+1}</td>
          <td>{user.name}</td>
          <td>{user.email}</td>
          <td><button onClick={ () => handleMakeAdmin(user._id)} className='btn btn-xs'>{user?.role === 'admin'? 'Admin' : 'Make Admin'}</button></td>
          <td><button className='btn btn-xs btn-accent'>Delete</button></td>
        </tr>)
      }
      
    </tbody>
  </table>
</div>
        </div>
    );
};

export default AllUsers;