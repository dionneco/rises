'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import { useTheme } from 'next-themes'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { Moon, Sun } from 'lucide-react'

export default function DemoSubmissionForm() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    artistName: '',
    isOver18: '',
    origin: '',
    hasSpotifyMusic: '',
    spotifyUrl: '',
    demoName: '',
    listeningLink: '',
    genre: '',
    hasCollaborators: '',
    collaborators: ''
  })

  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleSelectChange = (name: string, value: string) => {
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Here you would typically send the form data to your backend
    console.log('Form submitted:', formData)
    // Reset form or show success message
  }

  if (!mounted) return null

  return (
    <div className="relative w-full max-w-2xl mx-auto">
      <Button
        variant="outline"
        size="icon"
        className="absolute right-0 top-0 mt-4 mr-4"
        onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
      >
        {theme === 'dark' ? <Sun className="h-[1.2rem] w-[1.2rem]" /> : <Moon className="h-[1.2rem] w-[1.2rem]" />}
        <span className="sr-only">Toggle theme</span>
      </Button>
      <Card className="w-full">
        <CardHeader className="space-y-4">
          <div className="flex justify-center">
            <Image src="/rises.jpg" alt="Rises Functional Music Logo" width={100} height={100} />
          </div>
          <CardTitle className="text-center text-3xl font-bold text-purple-600 dark:text-purple-400">Rises Functional Music</CardTitle>
          <CardDescription className="text-center">
            Submit your demo for consideration
            <p className="mt-2 text-sm text-muted-foreground">
              If accepted, you'll enjoy: non-exclusive deals, exposure to our playlist fans, artist-centric support, professional cover art, fair revenue splits, and monthly payments.
            </p>
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="firstName">First Name</Label>
                <Input id="firstName" name="firstName" required onChange={handleInputChange} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="lastName">Last Name</Label>
                <Input id="lastName" name="lastName" required onChange={handleInputChange} />
              </div>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input id="email" name="email" type="email" required onChange={handleInputChange} />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="artistName">Artist Name / Stage Name</Label>
              <Input id="artistName" name="artistName" required onChange={handleInputChange} />
            </div>
            
            <div className="space-y-2">
              <Label>Are you over 18 years old?</Label>
              <RadioGroup name="isOver18" onValueChange={(value) => handleSelectChange('isOver18', value)}>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="yes" id="over18-yes" />
                  <Label htmlFor="over18-yes">Yes</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="no" id="over18-no" />
                  <Label htmlFor="over18-no">No</Label>
                </div>
              </RadioGroup>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="origin">Where are you from?</Label>
              <Input id="origin" name="origin" required onChange={handleInputChange} />
            </div>
            
            <div className="space-y-2">
              <Label>Do you have any music live on Spotify?</Label>
              <RadioGroup name="hasSpotifyMusic" onValueChange={(value) => handleSelectChange('hasSpotifyMusic', value)}>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="yes" id="spotify-yes" />
                  <Label htmlFor="spotify-yes">Yes</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="no" id="spotify-no" />
                  <Label htmlFor="spotify-no">No</Label>
                </div>
              </RadioGroup>
            </div>
            
            {formData.hasSpotifyMusic === 'yes' && (
              <div className="space-y-2">
                <Label htmlFor="spotifyUrl">What's your Spotify profile URL?</Label>
                <Input id="spotifyUrl" name="spotifyUrl" onChange={handleInputChange} />
              </div>
            )}
            
            <div className="space-y-2">
              <Label htmlFor="demoName">What's the name of your demo?</Label>
              <Input id="demoName" name="demoName" required onChange={handleInputChange} />
              <p className="text-sm text-muted-foreground">You can change this later.</p>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="listeningLink">Listening link (SoundCloud, Dropbox, Google Drive)</Label>
              <Input id="listeningLink" name="listeningLink" required onChange={handleInputChange} />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="genre">In what music genre would you categorize your demo?</Label>
              <Select name="genre" onValueChange={(value) => handleSelectChange('genre', value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select a genre" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="sleepy-lofi">Sleepy Lofi</SelectItem>
                  <SelectItem value="dark-ambient">Dark Ambient / Ambient</SelectItem>
                  <SelectItem value="lofi-hip-hop">Lofi Hip Hop</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <Label>Does your song have any collaborators?</Label>
              <RadioGroup name="hasCollaborators" onValueChange={(value) => handleSelectChange('hasCollaborators', value)}>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="yes" id="collab-yes" />
                  <Label htmlFor="collab-yes">Yes</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="no" id="collab-no" />
                  <Label htmlFor="collab-no">No</Label>
                </div>
              </RadioGroup>
            </div>
            
            {formData.hasCollaborators === 'yes' && (
              <div className="space-y-2">
                <Label htmlFor="collaborators">Please list your collaborators</Label>
                <Textarea 
                  id="collaborators" 
                  name="collaborators" 
                  placeholder="List collaborators separated by commas (e.g., Dua Lipa, Angèle)" 
                  onChange={handleInputChange}
                />
                <p className="text-sm text-muted-foreground">Do not include yourself here.</p>
              </div>
            )}
          </form>
        </CardContent>
        <CardFooter className="flex flex-col items-stretch gap-4">
          <Button type="submit" className="w-full bg-purple-600 hover:bg-purple-700 text-white">Submit Demo</Button>
          
          <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="item-1">
              <AccordionTrigger>Can I submit full albums or EPs?</AccordionTrigger>
              <AccordionContent>
                We welcome EPs and albums. When submitting, simply include the link to your complete work in the submission form.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-2">
              <AccordionTrigger>How does the payment process work?</AccordionTrigger>
              <AccordionContent>
                Our payment process is simple:
                1. Sign your track
                2. Complete our payment form
                3. We add your details to our system

                Your earnings are then automatically sent to your bank account. Please note there's a 2-3 month delay due to streaming platform schedules. After this initial period, you'll receive monthly payments for any revenue your track generates.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-3">
              <AccordionTrigger>Can I work with other artists or labels while signed to Rises?</AccordionTrigger>
              <AccordionContent>
                Yes, you can! We have a no-strings-attached policy. We only sign individual tracks, so you're free to collaborate with other artists, work with different labels, or release independently for your future projects.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-4">
              <AccordionTrigger>Do you offer split payments for collaborations?</AccordionTrigger>
              <AccordionContent>
                Yes, we do support split payments for collaborative works.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-5">
              <AccordionTrigger>How long does the signing process take?</AccordionTrigger>
              <AccordionContent>
                Thanks to our streamlined, automated process, we typically complete the signing within 48 hours.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-6">
              <AccordionTrigger>Which streaming platforms do you distribute to?</AccordionTrigger>
              <AccordionContent>
                We distribute your music to over 150 streaming platforms, including major ones like Spotify, Apple Music, Amazon Music, YouTube Music, Deezer, and Tidal.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-7">
              <AccordionTrigger>What file format should I use for my demo?</AccordionTrigger>
              <AccordionContent>
                Please submit your demos in .wav format. This helps streamline the process if your track is selected for signing.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-8">
              <AccordionTrigger>What's the recoupment clause in the contract?</AccordionTrigger>
              <AccordionContent>
                The recoupment clause covers potential expenses we might incur on your behalf, such as music video production or marketing costs like photoshoots. Don't worry - we'll always inform you beforehand and give you the option to opt in or out.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-9">
              <AccordionTrigger>How can I contact Rises for general inquiries?</AccordionTrigger>
              <AccordionContent>
                For any general inquiries, please reach out to us through our contact page at https://www.rises.agency/#contact
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-10">
              <AccordionTrigger>What happens after I sign my track with Rises?</AccordionTrigger>
              <AccordionContent>
                Once your track is signed, we'll add it to our playlist network, which has thousands of followers. The specific playlists will depend on your track's genre and overall fit.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </CardFooter>
      </Card>
    </div>
  )
}