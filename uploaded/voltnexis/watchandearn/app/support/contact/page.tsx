'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Mail, Phone, MessageCircle, Clock, MapPin } from 'lucide-react'

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    category: 'general',
    message: ''
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle form submission
    alert('Thank you for your message! We\'ll get back to you within 24 hours.')
    setFormData({ name: '', email: '', subject: '', category: 'general', message: '' })
  }

  const contactMethods = [
    {
      icon: <Mail className="w-6 h-6" />,
      title: 'Email Support',
      description: 'Get help via email',
      contact: 'support@watchearn.com',
      responseTime: 'Within 24 hours',
      color: 'from-blue-500 to-cyan-600'
    },
    {
      icon: <MessageCircle className="w-6 h-6" />,
      title: 'Live Chat',
      description: 'Chat with our team',
      contact: 'Available 9 AM - 6 PM IST',
      responseTime: 'Instant response',
      color: 'from-green-500 to-emerald-600'
    },
    {
      icon: <Phone className="w-6 h-6" />,
      title: 'Phone Support',
      description: 'Call us directly',
      contact: '+91 98765 43210',
      responseTime: 'Mon-Fri 9 AM - 6 PM',
      color: 'from-purple-500 to-pink-600'
    }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 py-12">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-4">
            Contact Support
          </h1>
          <p className="text-xl text-gray-600">
            We're here to help! Reach out to us through any of these channels.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {contactMethods.map((method, index) => (
            <Card key={index} className={`bg-gradient-to-br ${method.color} text-white border-0 shadow-lg`}>
              <CardContent className="p-6 text-center">
                <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  {method.icon}
                </div>
                <h3 className="text-xl font-semibold mb-2">{method.title}</h3>
                <p className="text-white/80 mb-3">{method.description}</p>
                <p className="font-medium mb-2">{method.contact}</p>
                <p className="text-sm text-white/70">{method.responseTime}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle className="text-2xl">Send us a Message</CardTitle>
              <p className="text-gray-600">Fill out the form below and we'll get back to you soon.</p>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="name">Full Name</Label>
                    <Input
                      id="name"
                      value={formData.name}
                      onChange={(e) => setFormData({...formData, name: e.target.value})}
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="email">Email Address</Label>
                    <Input
                      id="email"
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({...formData, email: e.target.value})}
                      required
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="category">Category</Label>
                  <select
                    id="category"
                    className="w-full p-2 border border-gray-300 rounded-md bg-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    value={formData.category}
                    onChange={(e) => setFormData({...formData, category: e.target.value})}
                  >
                    <option value="general">General Inquiry</option>
                    <option value="technical">Technical Support</option>
                    <option value="billing">Billing & Payments</option>
                    <option value="account">Account Issues</option>
                    <option value="streaming">Streaming Problems</option>
                    <option value="earnings">Earnings & Withdrawals</option>
                  </select>
                </div>

                <div>
                  <Label htmlFor="subject">Subject</Label>
                  <Input
                    id="subject"
                    value={formData.subject}
                    onChange={(e) => setFormData({...formData, subject: e.target.value})}
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="message">Message</Label>
                  <textarea
                    id="message"
                    className="w-full p-3 border border-gray-300 rounded-md h-32 resize-none bg-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Describe your issue or question in detail..."
                    value={formData.message}
                    onChange={(e) => setFormData({...formData, message: e.target.value})}
                    required
                  />
                </div>

                <Button type="submit" className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
                  Send Message
                </Button>
              </form>
            </CardContent>
          </Card>

          <div className="space-y-6">
            <Card className="shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Clock className="w-5 h-5" />
                  Support Hours
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span>Monday - Friday</span>
                    <span className="font-medium">9:00 AM - 6:00 PM IST</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Saturday</span>
                    <span className="font-medium">10:00 AM - 4:00 PM IST</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Sunday</span>
                    <span className="font-medium">Closed</span>
                  </div>
                </div>
                <div className="mt-4 p-3 bg-blue-50 rounded-lg">
                  <p className="text-sm text-blue-800">
                    <strong>Emergency Support:</strong> Critical issues are handled 24/7 via email.
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card className="shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MapPin className="w-5 h-5" />
                  Office Location
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <p className="font-medium">Watch & Earn Technologies</p>
                  <p className="text-gray-600">
                    123 Tech Park, Sector 5<br />
                    Bangalore, Karnataka 560001<br />
                    India
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card className="shadow-lg">
              <CardHeader>
                <CardTitle>Quick Links</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <a href="/support/faq" className="block text-blue-600 hover:underline">
                    Frequently Asked Questions
                  </a>
                  <a href="/legal/terms" className="block text-blue-600 hover:underline">
                    Terms of Service
                  </a>
                  <a href="/legal/privacy" className="block text-blue-600 hover:underline">
                    Privacy Policy
                  </a>
                  <a href="/legal/refund" className="block text-blue-600 hover:underline">
                    Refund Policy
                  </a>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}