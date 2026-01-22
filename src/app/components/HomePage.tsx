import { Link } from 'react-router-dom';
import { Search, Package, MessageSquare, TrendingUp, Clock, CheckCircle, Sparkles, ArrowRight, BarChart3, Shield, Star, Award, Users } from 'lucide-react';
import { Button } from '@/app/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/app/components/ui/card';
import { motion } from 'motion/react';
import { useItems } from '@/app/contexts/ItemsContext';
import { useTheme } from '@/app/contexts/ThemeContext';
import { ImpactCounter } from '@/app/components/ImpactCounter';
import { ReunitedGallery } from '@/app/components/ReunitedGallery';
import { LostItemsHeatmap } from '@/app/components/LostItemsHeatmap';
import { SmartNotifications } from '@/app/components/SmartNotifications';

export function HomePage() {
  const { items, claims } = useItems();
  const { theme, getColor } = useTheme();
  const approvedItems = items.filter(i => i.status === 'approved');
  const claimedItems = items.filter(i => i.status === 'claimed');
  const successRate = items.length > 0 ? Math.round((claimedItems.length / items.length) * 100) : 0;

  const isDark = theme === 'dark';

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5
      }
    }
  };

  return (
    <div>
      {/* Hero Section */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="relative overflow-hidden"
        style={{ backgroundColor: getColor('bgSecondary') }}
      >
        {/* Decorative background elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className={`absolute top-20 right-10 w-96 h-96 rounded-full ${isDark ? 'mix-blend-screen' : 'mix-blend-multiply'} filter blur-3xl`} style={{ backgroundColor: `${getColor('accent1Light')}15` }}></div>
          <div className={`absolute bottom-20 left-10 w-96 h-96 rounded-full ${isDark ? 'mix-blend-screen' : 'mix-blend-multiply'} filter blur-3xl`} style={{ backgroundColor: `${getColor('accent3Light')}15` }}></div>
          <div className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full ${isDark ? 'mix-blend-screen' : 'mix-blend-multiply'} filter blur-3xl`} style={{ backgroundColor: `${getColor('accent2')}10` }}></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 relative">
          <motion.div 
            className="text-center"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <motion.div
              initial={{ scale: 0, rotate: -10 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ duration: 0.6, delay: 0.3, type: "spring", stiffness: 200 }}
              className="inline-block mb-6"
            >
              <div 
                className="text-white px-6 py-2.5 rounded-full text-sm font-semibold shadow-lg inline-flex items-center gap-2"
                style={{
                  background: `linear-gradient(to right, ${getColor('accent1')}, ${getColor('accent1Light')})`
                }}
              >
                <Sparkles className="h-4 w-4" />
                Reuniting Students with Their Belongings Since 2026
              </div>
            </motion.div>

            <h1 className="text-6xl md:text-7xl lg:text-8xl font-bold mb-6 leading-tight">
              <span 
                className="bg-clip-text text-transparent"
                style={{
                  backgroundImage: `linear-gradient(to right, ${getColor('accent1')}, ${getColor('accent1Light')})`,
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent'
                }}
              >
                School Lost & Found
              </span>
            </h1>
            
            <p className="text-xl md:text-2xl mb-10 max-w-3xl mx-auto leading-relaxed font-light" style={{ color: getColor('textSecondary') }}>
              A modern, intelligent platform designed to help our school community reunite with lost items through smart search, seamless claims, and verified processes
            </p>
            
            <motion.div 
              className="flex gap-4 justify-center flex-wrap"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.5 }}
            >
              <Link to="/items" className="cursor-pointer">
                <Button 
                  size="lg" 
                  className="text-lg px-8 py-7 text-white shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all rounded-xl cursor-pointer"
                  style={{
                    background: `linear-gradient(to right, ${getColor('accent1')}, ${getColor('accent1Light')})`,
                  }}
                >
                  <Search className="mr-2 h-5 w-5" />
                  Search Lost Items
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <Link to="/submit" className="cursor-pointer">
                <Button 
                  size="lg" 
                  variant="outline" 
                  className="text-lg px-8 py-7 border-2 shadow-md hover:shadow-lg transform hover:-translate-y-1 transition-all rounded-xl cursor-pointer"
                  style={{
                    borderColor: getColor('accent1'),
                    color: getColor('accent1'),
                    backgroundColor: 'transparent'
                  }}
                >
                  <Package className="mr-2 h-5 w-5" />
                  Report Found Item
                </Button>
              </Link>
            </motion.div>
          </motion.div>

          {/* Live Stats Banner */}
          <motion.div 
            className="mt-20 backdrop-blur-md rounded-3xl shadow-xl p-8 border-2"
            style={{
              backgroundColor: getColor('bgCard'),
              borderColor: getColor('border')
            }}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              <motion.div 
                className="text-center group cursor-pointer"
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <div 
                  className="text-5xl md:text-6xl font-bold mb-2 bg-clip-text text-transparent"
                  style={{
                    backgroundImage: `linear-gradient(to right, ${getColor('accent1')}, ${getColor('accent1Light')})`,
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent'
                  }}
                >
                  {items.length}
                </div>
                <div className="font-medium text-sm" style={{ color: getColor('textSecondary') }}>Total Items Reported</div>
                <div className="mt-2 h-1 w-12 mx-auto rounded-full opacity-0 group-hover:opacity-100 transition-opacity" style={{ background: `linear-gradient(to right, ${getColor('accent1')}, ${getColor('accent1Light')})` }}></div>
              </motion.div>
              <motion.div 
                className="text-center group cursor-pointer"
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <div 
                  className="text-5xl md:text-6xl font-bold mb-2 bg-clip-text text-transparent"
                  style={{
                    backgroundImage: `linear-gradient(to right, ${getColor('accent1')}, ${getColor('accent1Dark')})`,
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent'
                  }}
                >
                  {claimedItems.length}
                </div>
                <div className="font-medium text-sm" style={{ color: getColor('textSecondary') }}>Successfully Returned</div>
                <div className="mt-2 h-1 w-12 mx-auto rounded-full opacity-0 group-hover:opacity-100 transition-opacity" style={{ background: `linear-gradient(to right, ${getColor('accent1')}, ${getColor('accent1Dark')})` }}></div>
              </motion.div>
              <motion.div 
                className="text-center group cursor-pointer"
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <div 
                  className="text-5xl md:text-6xl font-bold mb-2 bg-clip-text text-transparent"
                  style={{
                    backgroundImage: `linear-gradient(to right, ${getColor('accent2')}, ${getColor('accent2Light')})`,
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent'
                  }}
                >
                  {approvedItems.length}
                </div>
                <div className="font-medium text-sm" style={{ color: getColor('textSecondary') }}>Currently Available</div>
                <div className="mt-2 h-1 w-12 mx-auto rounded-full opacity-0 group-hover:opacity-100 transition-opacity" style={{ background: `linear-gradient(to right, ${getColor('accent2')}, ${getColor('accent2Light')})` }}></div>
              </motion.div>
              <motion.div 
                className="text-center group cursor-pointer"
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <div 
                  className="text-5xl md:text-6xl font-bold mb-2 bg-clip-text text-transparent"
                  style={{
                    backgroundImage: `linear-gradient(to right, ${getColor('accent3')}, ${getColor('accent3Light')})`,
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent'
                  }}
                >
                  {successRate}%
                </div>
                <div className="font-medium text-sm" style={{ color: getColor('textSecondary') }}>Success Rate</div>
                <div className="mt-2 h-1 w-12 mx-auto rounded-full opacity-0 group-hover:opacity-100 transition-opacity" style={{ background: `linear-gradient(to right, ${getColor('accent3')}, ${getColor('accent3Light')})` }}></div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </motion.div>

      {/* Features Section */}
      <motion.div 
        className="py-24"
        style={{ backgroundColor: getColor('bgPrimary') }}
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div variants={itemVariants} className="text-center mb-16">
            <span 
              className="inline-block px-4 py-2 rounded-full text-sm font-semibold mb-4"
              style={{
                backgroundColor: `${getColor('accent1')}20`,
                color: getColor('accent1')
              }}
            >
              Why Choose Us
            </span>
            <h2 
              className="text-5xl md:text-6xl font-bold mb-4 bg-clip-text text-transparent"
              style={{
                backgroundImage: `linear-gradient(to right, ${getColor('accent1')}, ${getColor('accent1Light')})`,
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent'
              }}
            >
              Powerful Features
            </h2>
            <p className="text-xl max-w-2xl mx-auto font-light" style={{ color: getColor('textSecondary') }}>
              Everything you need to manage lost and found items efficiently and effectively
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              { 
                icon: Search, 
                title: 'Smart Search', 
                description: 'Advanced filtering by category, location, date, and keywords with instant real-time results and smart suggestions',
                link: '/items',
                linkText: 'Browse Items',
                accent: 'accent1'
              },
              { 
                icon: Package, 
                title: 'Easy Reporting', 
                description: 'Submit found items with photos, detailed descriptions, location information, and automatic QR code generation',
                link: '/submit',
                linkText: 'Report Item',
                accent: 'accent1'
              },
              { 
                icon: MessageSquare, 
                title: 'Verified Claims', 
                description: 'Secure claim process with multi-step verification to ensure items reach their rightful owners safely',
                link: '/claims',
                linkText: 'Claims Portal',
                accent: 'accent2'
              },
              { 
                icon: BarChart3, 
                title: 'Analytics Dashboard', 
                description: 'Track detailed statistics, success rates, trends, and insights to continuously improve the system',
                link: '/admin',
                linkText: 'View Dashboard',
                accent: 'accent3'
              },
              { 
                icon: Clock, 
                title: 'Real-time Updates', 
                description: 'Get instant notifications and updates when new items are found or when claims are processed',
                link: '/notifications',
                linkText: 'Notifications',
                accent: 'accent1'
              },
              { 
                icon: Shield, 
                title: 'Secure & Private', 
                description: 'Your data is protected with admin verification, secure processes, and privacy-first design principles',
                link: '/security',
                linkText: 'Security Info',
                accent: 'accent1'
              }
            ].map((feature, index) => (
              <motion.div key={index} variants={itemVariants}>
                <Link to={feature.link} className="block h-full cursor-pointer">
                  <Card 
                    className="group hover:shadow-2xl transition-all duration-500 border-2 shadow-lg backdrop-blur-sm h-full hover:-translate-y-2 rounded-2xl overflow-hidden cursor-pointer"
                    style={{
                      backgroundColor: getColor('bgCard'),
                      borderColor: getColor('border')
                    }}
                  >
                    <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity" style={{ background: `linear-gradient(to bottom right, ${getColor(feature.accent)}10, transparent)` }}></div>
                    <CardHeader className="relative">
                      <div 
                        className="w-16 h-16 rounded-2xl flex items-center justify-center mb-4 shadow-lg group-hover:shadow-xl transition-all group-hover:scale-110"
                        style={{
                          background: `linear-gradient(to bottom right, ${getColor(feature.accent)}, ${getColor(feature.accent + 'Light')})`
                        }}
                      >
                        <feature.icon className="h-8 w-8 text-white" />
                      </div>
                      <CardTitle className="text-2xl mb-2" style={{ color: getColor('textPrimary') }}>{feature.title}</CardTitle>
                      <CardDescription className="text-base leading-relaxed" style={{ color: getColor('textSecondary') }}>
                        {feature.description}
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <span
                        className="p-0 font-semibold group/btn hover:no-underline inline-flex items-center transition-colors hover:opacity-80"
                        style={{ color: getColor(feature.accent) }}
                      >
                        {feature.linkText} <ArrowRight className="ml-1 h-4 w-4 group-hover/btn:translate-x-1 transition-transform" />
                      </span>
                    </CardContent>
                  </Card>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>

      {/* How It Works */}
      <motion.div 
        className="py-24"
        style={{ backgroundColor: getColor('bgTertiary') }}
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            className="text-center mb-20"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <span 
              className="inline-block px-4 py-2 rounded-full text-sm font-semibold mb-4"
              style={{
                backgroundColor: `${getColor('accent1')}20`,
                color: getColor('accent1')
              }}
            >
              Simple Process
            </span>
            <h2 
              className="text-5xl md:text-6xl font-bold mb-4 bg-clip-text text-transparent"
              style={{
                backgroundImage: `linear-gradient(to right, ${getColor('accent1')}, ${getColor('accent1Light')})`,
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent'
              }}
            >
              How It Works
            </h2>
            <p className="text-xl font-light" style={{ color: getColor('textSecondary') }}>Three simple steps to reunite with your items</p>
          </motion.div>
          
          <div className="grid md:grid-cols-3 gap-12 relative">
            {/* Connection lines for desktop */}
            <div 
              className="hidden md:block absolute top-1/2 left-0 w-full h-0.5 -z-10"
              style={{
                background: `linear-gradient(to right, ${getColor('accent1')}20, ${getColor('accent1Light')}20, ${getColor('accent2')}20)`
              }}
            ></div>
            
            {[
              {
                number: 1,
                title: 'Search or Report',
                description: 'Lost something? Use our smart search with advanced filters. Found something? Report it with detailed information and photos to help others.',
                gradient: `linear-gradient(to bottom right, ${getColor('accent1')}, ${getColor('accent1Light')})`
              },
              {
                number: 2,
                title: 'Submit a Claim',
                description: 'Found your item? Submit a detailed claim with proof of ownership. Our verification system ensures security and authenticity.',
                gradient: `linear-gradient(to bottom right, ${getColor('accent1')}, ${getColor('accent1Dark')})`
              },
              {
                number: 3,
                title: 'Pick It Up',
                description: 'After verification, receive instant notification and collect your item from the lost and found office during business hours.',
                gradient: `linear-gradient(to bottom right, ${getColor('accent2')}, ${getColor('accent2Light')})`
              }
            ].map((step, index) => (
              <motion.div 
                key={index}
                className="text-center relative"
                initial={{ opacity: 0, x: index === 0 ? -50 : index === 2 ? 50 : 0, y: index === 1 ? 50 : 0 }}
                whileInView={{ opacity: 1, x: 0, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 + index * 0.2 }}
              >
                <div className="relative inline-block mb-8">
                  <div 
                    className="rounded-3xl w-28 h-28 flex items-center justify-center mx-auto shadow-2xl relative z-10 group hover:scale-110 transition-transform cursor-pointer"
                    style={{ background: step.gradient }}
                  >
                    <span className="text-5xl font-bold text-white">{step.number}</span>
                  </div>
                  <div 
                    className="absolute -inset-3 rounded-3xl -z-10 blur-lg opacity-50"
                    style={{ background: step.gradient }}
                  ></div>
                </div>
                <h3 className="text-3xl font-bold mb-4" style={{ color: getColor('textPrimary') }}>{step.title}</h3>
                <p className="text-lg leading-relaxed" style={{ color: getColor('textSecondary') }}>
                  {step.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>

      {/* Success Stories */}
      <motion.div 
        className="py-24"
        style={{ backgroundColor: getColor('bgPrimary') }}
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <span 
              className="inline-block px-4 py-2 rounded-full text-sm font-semibold mb-4"
              style={{
                backgroundColor: `${getColor('accent2')}20`,
                color: getColor('accent2')
              }}
            >
              Success Stories
            </span>
            <h2 
              className="text-5xl font-bold mb-4 bg-clip-text text-transparent"
              style={{
                backgroundImage: `linear-gradient(to right, ${getColor('accent2')}, ${getColor('accent2Light')})`,
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent'
              }}
            >
              Real Impact, Real Results
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              { icon: Award, number: successRate + '%', label: 'Success Rate', accent: 'accent1' },
              { icon: Users, number: items.length + '+', label: 'Happy Students', accent: 'accent3' },
              { icon: Star, number: claimedItems.length, label: 'Items Reunited', accent: 'accent2' }
            ].map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <Card 
                  className="text-center p-8 border-0 shadow-lg hover:shadow-2xl transition-all backdrop-blur-sm rounded-2xl hover:-translate-y-2"
                  style={{ backgroundColor: getColor('bgCard') }}
                >
                  <div 
                    className="w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg"
                    style={{
                      background: `linear-gradient(to bottom right, ${getColor(stat.accent)}, ${getColor(stat.accent + 'Light')})`
                    }}
                  >
                    <stat.icon className="h-8 w-8 text-white" />
                  </div>
                  <div 
                    className="text-5xl font-bold mb-2 bg-clip-text text-transparent"
                    style={{
                      backgroundImage: `linear-gradient(to right, ${getColor(stat.accent)}, ${getColor(stat.accent + 'Light')})`,
                      WebkitBackgroundClip: 'text',
                      WebkitTextFillColor: 'transparent'
                    }}
                  >
                    {stat.number}
                  </div>
                  <div className="font-medium" style={{ color: getColor('textSecondary') }}>{stat.label}</div>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>

      {/* CTA Section */}
      <motion.div 
        className="py-24"
        style={{ backgroundColor: getColor('bgPrimary') }}
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Card 
            className="border-0 shadow-2xl overflow-hidden rounded-3xl relative"
            style={{
              background: `linear-gradient(to right, ${getColor('accent1')}, ${getColor('accent1Light')})`
            }}
          >
            <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAxMCAwIEwgMCAwIDAgMTAiIGZpbGw9Im5vbmUiIHN0cm9rZT0id2hpdGUiIHN0cm9rZS1vcGFjaXR5PSIwLjA1IiBzdHJva2Utd2lkdGg9IjEiLz48L3BhdHRlcm4+PC9kZWZzPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9InVybCgjZ3JpZCkiLz48L3N2Zz4=')] opacity-30"></div>
            <CardContent className="p-12 md:p-16 text-center text-white relative">
              <motion.div
                initial={{ scale: 0.9 }}
                whileInView={{ scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
              >
                <TrendingUp className="h-20 w-20 mx-auto mb-6 opacity-90" />
                <h2 className="text-4xl md:text-5xl font-bold mb-4">Ready to Find Your Lost Item?</h2>
                <p className="text-xl mb-10 text-white/90 max-w-2xl mx-auto font-light leading-relaxed">
                  Join hundreds of students who have successfully reunited with their belongings through our intelligent platform
                </p>
                <div className="flex gap-4 justify-center flex-wrap">
                  <Link to="/items">
                    <Button size="lg" variant="secondary" className="text-lg px-10 py-7 bg-white hover:bg-gray-50 shadow-lg rounded-xl font-semibold hover:shadow-xl transition-all" style={{ color: getColor('accent1') }}>
                      Start Searching Now
                      <ArrowRight className="ml-2 h-5 w-5" />
                    </Button>
                  </Link>
                  <Link to="/submit">
                    <Button size="lg" className="text-lg px-10 py-7 border-2 border-white bg-white/20 text-white hover:bg-white backdrop-blur-sm rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all hover:text-gray-900">
                      Report an Item
                    </Button>
                  </Link>
                </div>
              </motion.div>
            </CardContent>
          </Card>
        </div>
      </motion.div>

      {/* Impact Counter */}
      <ImpactCounter
        itemsReturned={claimedItems.length}
        studentsHelped={items.length}
        avgReturnTime={2}
        successRate={successRate}
      />

      {/* Reunited Gallery */}
      <ReunitedGallery />

      {/* Heatmap */}
      <LostItemsHeatmap />

      {/* Smart Notifications */}
      <SmartNotifications />

      {/* Footer */}
      <footer style={{ backgroundColor: getColor('bgTertiary'), color: getColor('textPrimary') }} className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <h3 className="font-bold text-lg mb-4" style={{ color: getColor('accent1Light') }}>Quick Links</h3>
              <ul className="space-y-2 text-sm" style={{ color: getColor('textSecondary') }}>
                <li><Link to="/" className="hover:opacity-80 transition-colors cursor-pointer" style={{ color: getColor('textSecondary') }}>Home</Link></li>
                <li><Link to="/items" className="hover:opacity-80 transition-colors cursor-pointer" style={{ color: getColor('textSecondary') }}>Browse Items</Link></li>
                <li><Link to="/submit" className="hover:opacity-80 transition-colors cursor-pointer" style={{ color: getColor('textSecondary') }}>Report Item</Link></li>
                <li><Link to="/admin" className="hover:opacity-80 transition-colors cursor-pointer" style={{ color: getColor('textSecondary') }}>Admin Portal</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold text-lg mb-4" style={{ color: getColor('accent1Light') }}>Support</h3>
              <ul className="space-y-2 text-sm" style={{ color: getColor('textSecondary') }}>
                <li><a href="#" className="hover:opacity-80 transition-colors cursor-pointer">Help Center</a></li>
                <li><a href="#" className="hover:opacity-80 transition-colors cursor-pointer">Contact Us</a></li>
                <li><a href="#" className="hover:opacity-80 transition-colors cursor-pointer">FAQs</a></li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold text-lg mb-4" style={{ color: getColor('accent1Light') }}>Office Hours</h3>
              <ul className="space-y-2 text-sm" style={{ color: getColor('textSecondary') }}>
                <li>Monday - Friday</li>
                <li>8:00 AM - 5:00 PM</li>
                <li>Student Center, Room 101</li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold text-lg mb-4" style={{ color: getColor('accent1Light') }}>About</h3>
              <p className="text-sm leading-relaxed" style={{ color: getColor('textSecondary') }}>
                Helping our school community reunite with lost belongings since 2026. Built with care for students, by students.
              </p>
            </div>
          </div>
          <div className="border-t pt-8 text-center text-sm" style={{ borderColor: getColor('border'), color: getColor('textTertiary') }}>
            <p>© 2026 School Lost & Found. All rights reserved. Made with ❤️ for our community.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}