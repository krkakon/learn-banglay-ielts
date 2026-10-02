import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle2, Headphones, BookOpen, PenTool, Mic, PlayCircle, FileText, BarChart, Smartphone, Lock, GraduationCap } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1">
        {/* HERO SECTION */}
        <section className="relative py-20 lg:py-32 overflow-hidden">
          <div className="absolute inset-0 bg-white/10 backdrop-blur-3xl -z-10"></div>
          <div className="container mx-auto px-4 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center relative z-10">
            <div className="space-y-8 text-center lg:text-left">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-foreground">
                Learn Banglay IELTS
              </h1>
              <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto lg:mx-0">
                Master IELTS with structured lessons, private video classes, and downloadable study materials.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <Link href="/login">
                  <Button size="lg" className="w-full sm:w-auto font-semibold">LOGIN TO COURSE</Button>
                </Link>
                <Link href="/register">
                  <Button size="lg" variant="outline" className="w-full sm:w-auto font-semibold">JOIN COURSE</Button>
                </Link>
              </div>
            </div>
            <div className="relative aspect-square max-w-md mx-auto lg:max-w-none w-full hidden sm:block">
              <div className="absolute inset-0 bg-primary/20 rounded-full blur-3xl opacity-30"></div>
              {/* Using a placeholder container for illustration */}
              <div className="relative h-full w-full bg-white/30 backdrop-blur-xl rounded-[2.5rem] border border-white/60 flex items-center justify-center shadow-2xl shadow-red-900/10 overflow-hidden ring-1 ring-white/50">
                <GraduationCap className="h-48 w-48 text-primary/60 drop-shadow-xl" />
                <div className="absolute inset-0 bg-gradient-to-tr from-white/40 via-transparent to-white/10 pointer-events-none"></div>
              </div>
            </div>
          </div>
        </section>

        {/* COURSE SECTION */}
        <section id="modules" className="py-20 relative">
          <div className="container mx-auto px-4 relative z-10">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-4 text-foreground">Complete IELTS Preparation Course</h2>
              <p className="text-muted-foreground text-lg">
                Prepare for all four IELTS modules through structured private video lessons and study materials.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {/* Listening */}
              <Card className="hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1">
                <CardHeader>
                  <div className="h-12 w-12 bg-primary/20 backdrop-blur-sm rounded-lg flex items-center justify-center mb-4 border border-primary/20">
                    <Headphones className="h-6 w-6 text-primary" />
                  </div>
                  <CardTitle>IELTS Listening</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 text-sm text-foreground/80 mb-6 font-medium">
                    <li className="flex items-center"><CheckCircle2 className="h-4 w-4 mr-2 text-primary" /> Listening strategies</li>
                    <li className="flex items-center"><CheckCircle2 className="h-4 w-4 mr-2 text-primary" /> Question types</li>
                    <li className="flex items-center"><CheckCircle2 className="h-4 w-4 mr-2 text-primary" /> Practice techniques</li>
                    <li className="flex items-center"><CheckCircle2 className="h-4 w-4 mr-2 text-primary" /> Video lessons</li>
                  </ul>
                  <Link href="/login">
                    <Button variant="outline" className="w-full bg-white/50 backdrop-blur-sm border-white/60 hover:bg-white/80">Explore Listening</Button>
                  </Link>
                </CardContent>
              </Card>

              {/* Reading */}
              <Card className="hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1">
                <CardHeader>
                  <div className="h-12 w-12 bg-primary/20 backdrop-blur-sm rounded-lg flex items-center justify-center mb-4 border border-primary/20">
                    <BookOpen className="h-6 w-6 text-primary" />
                  </div>
                  <CardTitle>IELTS Reading</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 text-sm text-foreground/80 mb-6 font-medium">
                    <li className="flex items-center"><CheckCircle2 className="h-4 w-4 mr-2 text-primary" /> Reading strategies</li>
                    <li className="flex items-center"><CheckCircle2 className="h-4 w-4 mr-2 text-primary" /> Skimming and scanning</li>
                    <li className="flex items-center"><CheckCircle2 className="h-4 w-4 mr-2 text-primary" /> Question types</li>
                    <li className="flex items-center"><CheckCircle2 className="h-4 w-4 mr-2 text-primary" /> Practice lessons</li>
                  </ul>
                  <Link href="/login">
                    <Button variant="outline" className="w-full bg-white/50 backdrop-blur-sm border-white/60 hover:bg-white/80">Explore Reading</Button>
                  </Link>
                </CardContent>
              </Card>

              {/* Writing */}
              <Card className="hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1">
                <CardHeader>
                  <div className="h-12 w-12 bg-primary/20 backdrop-blur-sm rounded-lg flex items-center justify-center mb-4 border border-primary/20">
                    <PenTool className="h-6 w-6 text-primary" />
                  </div>
                  <CardTitle>IELTS Writing</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 text-sm text-foreground/80 mb-6 font-medium">
                    <li className="flex items-center"><CheckCircle2 className="h-4 w-4 mr-2 text-primary" /> Task 1 & Task 2</li>
                    <li className="flex items-center"><CheckCircle2 className="h-4 w-4 mr-2 text-primary" /> Essay structure</li>
                    <li className="flex items-center"><CheckCircle2 className="h-4 w-4 mr-2 text-primary" /> Vocabulary & Grammar</li>
                    <li className="flex items-center"><CheckCircle2 className="h-4 w-4 mr-2 text-primary" /> Band score strategies</li>
                  </ul>
                  <Link href="/login">
                    <Button variant="outline" className="w-full bg-white/50 backdrop-blur-sm border-white/60 hover:bg-white/80">Explore Writing</Button>
                  </Link>
                </CardContent>
              </Card>

              {/* Speaking */}
              <Card className="hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1">
                <CardHeader>
                  <div className="h-12 w-12 bg-primary/20 backdrop-blur-sm rounded-lg flex items-center justify-center mb-4 border border-primary/20">
                    <Mic className="h-6 w-6 text-primary" />
                  </div>
                  <CardTitle>IELTS Speaking</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 text-sm text-foreground/80 mb-6 font-medium">
                    <li className="flex items-center"><CheckCircle2 className="h-4 w-4 mr-2 text-primary" /> Speaking Parts 1, 2, 3</li>
                    <li className="flex items-center"><CheckCircle2 className="h-4 w-4 mr-2 text-primary" /> Cue cards</li>
                    <li className="flex items-center"><CheckCircle2 className="h-4 w-4 mr-2 text-primary" /> Fluency building</li>
                    <li className="flex items-center"><CheckCircle2 className="h-4 w-4 mr-2 text-primary" /> Vocabulary</li>
                  </ul>
                  <Link href="/login">
                    <Button variant="outline" className="w-full bg-white/50 backdrop-blur-sm border-white/60 hover:bg-white/80">Explore Speaking</Button>
                  </Link>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* FEATURES SECTION */}
        <section id="features" className="py-20 relative">
          <div className="absolute inset-0 bg-white/20 backdrop-blur-3xl -z-10"></div>
          <div className="container mx-auto px-4 relative z-10">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-foreground">Platform Features</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[
                { icon: PlayCircle, title: "Private Video Lessons", desc: "High-quality video content exclusive to enrolled students." },
                { icon: FileText, title: "Downloadable PDF Materials", desc: "Access premium study guides, vocabulary lists, and practice tests." },
                { icon: BarChart, title: "Course Progress Tracking", desc: "Monitor your learning journey and see exactly where you left off." },
                { icon: Smartphone, title: "Mobile Friendly", desc: "Learn on the go. Our platform is perfectly optimized for your phone." },
                { icon: Lock, title: "Secure Student Login", desc: "Your data and course progress are safely stored in your private dashboard." },
                { icon: CheckCircle2, title: "Structured Preparation", desc: "Follow a proven step-by-step curriculum to hit your target band score." },
              ].map((feature, i) => (
                <div key={i} className="flex items-start space-x-4 bg-white/40 backdrop-blur-md p-6 rounded-2xl shadow-xl shadow-red-900/5 border border-white/60 hover:bg-white/60 transition-colors">
                  <div className="bg-primary/20 backdrop-blur-md p-3 rounded-xl border border-primary/20">
                    <feature.icon className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg mb-1">{feature.title}</h3>
                    <p className="text-muted-foreground text-sm font-medium">{feature.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ABOUT SECTION */}
        <section id="about" className="py-20 relative">
          <div className="container mx-auto px-4 text-center max-w-4xl relative z-10">
            <Card className="p-8 md:p-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-6">About Learn Banglay IELTS</h2>
              <p className="text-lg text-foreground/80 mb-8 leading-relaxed font-medium">
                <strong>Learn Banglay IELTS</strong> provides structured IELTS learning resources designed to help students prepare for Listening, Reading, Writing, and Speaking. We believe that with the right guidance, high-quality materials, and a clear study plan, achieving your dream band score is entirely possible.
              </p>
              <Link href="/register">
                <Button size="lg" className="shadow-lg shadow-primary/30">Learn More & Join Today</Button>
              </Link>
            </Card>
          </div>
        </section>

        {/* CTA SECTION */}
        <section className="py-24 relative text-center text-white overflow-hidden shadow-inner">
          <div className="absolute inset-0 bg-gradient-to-br from-red-600/90 to-red-800/90 backdrop-blur-xl -z-10"></div>
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-white/20 via-transparent to-transparent -z-10"></div>
          <div className="container mx-auto px-4 max-w-3xl relative z-10">
            <h2 className="text-3xl md:text-5xl font-bold mb-6 drop-shadow-sm">Start Your IELTS Journey Today</h2>
            <p className="text-lg md:text-xl text-white/90 mb-10 drop-shadow-sm">
              Access structured IELTS lessons, private video classes, and useful study materials in one place.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/login">
                <Button size="lg" variant="secondary" className="w-full sm:w-auto font-semibold bg-white text-red-700 hover:bg-white/90 shadow-lg shadow-black/10 border-0">LOGIN TO COURSE</Button>
              </Link>
              <Link href="/register">
                <Button size="lg" variant="outline" className="w-full sm:w-auto font-semibold bg-white/10 backdrop-blur-sm text-white border-white/40 hover:bg-white/20 shadow-lg shadow-black/10">REGISTER NOW</Button>
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
