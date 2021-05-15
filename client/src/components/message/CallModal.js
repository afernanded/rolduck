import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import Avatar from '../Avatar';
import { GLOBALTYPES } from '../../redux/actions/globalTypes';


const CallModal = () => {
    const { call, auth, peer, socket } = useSelector(state => state)
    const dispatch = useDispatch()

    const [hours, setHours] = useState(0)
    const [mins, setMins] = useState(0)
    const [second, setSecond] = useState(0)
    const [total, setTotal] = useState(0)

    const [answer, setAnswer] = useState(false)

    // Set Time
    useEffect(() => {
        const setTime = () => {
            setTotal(t => t + 1)
            setTimeout(setTime, 1000)
        }
        setTime()

        return () => setTotal(0)
    },[])

    useEffect(() => {
        setSecond(total%60)
        setMins(parseInt(total/60))
        setHours(parseInt(total/3600))
    },[total])

    // End Call
    const handleEndCall = () => {
        
        let times = answer ? total : 0
        socket.emit('endCall', {...call, times})
        
        dispatch({type: GLOBALTYPES.CALL, payload: null })
    }

    useEffect(() => {
        if(answer){
            setTotal(0)
        }else{
            const timer = setTimeout(() => {
                dispatch({type: GLOBALTYPES.CALL, payload: null })
            }, 15000)
    
            return () => clearTimeout(timer)
        }
    },[dispatch, answer])


    useEffect(() => {
        socket.on('endCallToClient', data => {
            
            dispatch({ type: GLOBALTYPES.CALL, payload: null })
        })

        return () => socket.off('endCallToClient')
    },[socket, dispatch])

        // Answer Call
        const handleAnswer = () => {
                setAnswer(true)
        }


    return (
        <div className="call_modal">
            <div className="call_box">
                <div className="text-center" style={{padding: '40px 0'}}>
                    <Avatar src={call.avatar} size="super-avatar" />
                    <h4>{call.username}</h4>
                    <h6>{call.fullname}</h6>
                    {
                        answer 
                        ? <div>
                            <span>{ hours.toString().length < 2 ? '0' + hours : hours }</span>
                            <span>:</span>
                            <span>{ mins.toString().length < 2 ? '0' + mins : mins }</span>
                            <span>:</span>
                            <span>{ second.toString().length < 2 ? '0' + second : second }</span>
                        </div>
                        : <div>
                            {
                                call.video
                                ? <span>calling video...</span>
                                : <span>calling audio...</span>
                            }
                        </div>
                    }
                </div>

                <div className="timer">
                    <small>{ mins.toString().length < 2 ? '0' + mins : mins }</small>
                    <small>:</small>
                    <small>{ second.toString().length < 2 ? '0' + second : second }</small>
                </div>

                <div className="call_menu">
                    <span className="material-icons text-danger"
                    onClick={handleEndCall}>
                        call_end
                    </span>

                    {
                        (call.recipient === auth.user._id && !answer) &&
                        <>
                            {
                                call.video
                                ? <span className="material-icons text-success"
                                onClick={handleAnswer}>
                                    videocam
                                </span>
                                : <span className="material-icons text-success"
                                onClick={handleAnswer}>
                                    call
                                </span>
                            }
                        </>
                    }
                </div>

            </div>
        </div>
    )
}

export default CallModal
