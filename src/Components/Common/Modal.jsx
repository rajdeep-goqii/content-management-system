// src/components/Common/Modal.jsx
import React from 'react'
import { FcApproval, FcHighPriority} from 'react-icons/fc';

const Modal = ({title, content, action}) => {
  return (
    <dialog id="modal" className="modal">
  <div className="modal-box">
    <form method="dialog">
      {/* if there is a button in form, it will close the modal */}
      <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
    </form>
    {action === 'success' ? <FcApproval className='text-7xl w-full animate-pulse' /> : <FcHighPriority className='text-7xl w-full animate-bounce' />}
    <h3 className="font-bold text-3xl text-center">{title}</h3>
    <p className="py-4 text-center text-lg">{content}</p>
  </div>
</dialog>
  )
}

export default Modal