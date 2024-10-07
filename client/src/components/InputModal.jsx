import React,{useState} from 'react';
import { useNavigate } from 'react-router-dom';
function InputModal() {
    const [username, setUsername] = useState('');
    const [roomId, setRoomId] = useState('');
    const navigate = useNavigate();

    const handleJoinRoom = () =>{
        if(username && roomId){
            localStorage.setItem('username',username);
            localStorage.setItem('roomId',roomId);
            navigate(`c/${roomId}`);
        }else{
            alert('Please enter both username and room ID.');
        }
    }
    const handleCreateRoom = () => {
        if (username) {
            const newRoomId = Math.random().toString(36).substring(2, 9); 
            localStorage.setItem('username', username);
            localStorage.setItem('roomId', newRoomId);
            navigate(`/c/${newRoomId}`); 
        } else {
            alert('Please enter a username.');
        }
    };


    return (
        <div className="flex justify-center items-center min-h-screen bg-gray-100">
            <div className="bg-white shadow-lg rounded-lg p-8 max-w-sm w-full">


                <h2 className="text-2xl font-semibold text-center mb-6 text-gray-800">Enter the Room</h2>


                <div className='flex flex-col gap-4'>
                    <input
                        type="text"
                        placeholder="Enter Name"
                        required
                        className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent mb-4"
                        value={username}
                        onChange={(e)=>setUsername(e.target.value)}
                
                    />

                </div>
                <div className="flex flex-col gap-4">
                    <input
                        type="text"
                        placeholder="Room ID"
                        className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        value={roomId}
                        onChange={(e) => setRoomId(e.target.value)}
                    />
                    <button
                        className="w-full bg-blue-500 text-white py-3 rounded-md hover:bg-blue-600 transition duration-300"
                    onClick={handleJoinRoom}>
                        Join Room
                    </button>
                </div>


                <div className="flex items-center justify-center my-6">
                    <div className="border-t w-full border-gray-300"></div>
                    <span className="mx-4 text-gray-400">OR</span>
                    <div className="border-t w-full border-gray-300"></div>
                </div>


                <button
                    className="w-full bg-green-500 text-white py-3 rounded-md hover:bg-green-600 transition duration-300"
                    onClick={handleCreateRoom}
                >
                    Create Room
                </button>
            </div>
        </div>
    );
}

export default InputModal;
