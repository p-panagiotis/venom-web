import { useState } from 'react'
import { useSession } from '../contexts/Session'
import { useToast } from '../contexts/Toast'
import Form from './ui/Form'
import Header from './ui/Header'

const ContactUs = () => {

  const [state, setState] = useState()
  const { toast } = useToast()
  const { session } = useSession()
  
  const handleOnSuccess = () => {
    toast.success('Thank you for being awesome! We\'ve received your message and will get back to you within 24 hours.', { 
      dismissTimeout: 5000 
    })

    setState({
      name: null,
      email: null,
      inquiry_type: 'Support',
      subject: null,
      message: null,
      send_copy_email: false
    })
  }

  return (
    <div id='contactus-container'>
      <Header text='Contact our team' fontSize={28} />
      <p className='sub-note'>Our team is happy to answer your questions. Fill out the form and we'll be in touch as soon as possible.</p>

      <Form url='/core/api/inquiries' onsuccess={handleOnSuccess} state={state}>   
        <Form.Input property='name' label='Name' maxLength={100} required={true} />
        <Form.Input property='email' type='email' label='Email address' maxLength={256} required={true} value={session.user.email} />
        <Form.Input property='inquiry_type' label='Inquiry' value='Support' maxLength={128} disabled={true} required={true} />
        <Form.Input property='subject' label='Subject' maxLength={128} required={true} />
        <Form.TextArea property='message' label='Message' rows='10' required={true} />
        <Form.Checkbox property='send_copy_email' label='Send me a copied email' />
        <Form.Submit>Send message</Form.Submit>
      </Form>
    </div>
  )
}

export default ContactUs
