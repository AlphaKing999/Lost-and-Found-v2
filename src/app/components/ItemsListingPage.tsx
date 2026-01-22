import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useItems } from '@/app/contexts/ItemsContext';
import { useTheme } from '@/app/contexts/ThemeContext';
import { Input } from '@/app/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/app/components/ui/select';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/app/components/ui/card';
import { Badge } from '@/app/components/ui/badge';
import { Button } from '@/app/components/ui/button';
import { Search, Filter, MapPin, Calendar, Eye, Package, TrendingUp, Clock, SlidersHorizontal, Grid3x3, List, X } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export function ItemsListingPage() {
  const { items } = useItems();
  const { getColor } = useTheme();
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('approved');
  const [sortBy, setSortBy] = useState('recent');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  const categories = ['all', 'Electronics', 'Bags', 'Clothing', 'Books', 'School Supplies', 'Personal Items', 'Sports Equipment', 'Keys', 'Other'];

  let filteredItems = items.filter(item => {
    const matchesSearch = item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.location.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = categoryFilter === 'all' || item.category === categoryFilter;
    const matchesStatus = statusFilter === 'all' || item.status === statusFilter;
    
    return matchesSearch && matchesCategory && matchesStatus;
  });

  // Sorting
  filteredItems = [...filteredItems].sort((a, b) => {
    switch (sortBy) {
      case 'recent':
        return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
      case 'oldest':
        return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
      case 'title':
        return a.title.localeCompare(b.title);
      default:
        return 0;
    }
  });

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'approved':
        return (
          <Badge 
            className="border-0 text-white shadow-sm"
            style={{ background: `linear-gradient(to right, ${getColor('accent1')}, ${getColor('accent1Light')})` }}
          >
            Available
          </Badge>
        );
      case 'claimed':
        return (
          <Badge 
            className="border-0 text-white shadow-sm"
            style={{ background: `linear-gradient(to right, ${getColor('accent2')}, ${getColor('accent2Light')})` }}
          >
            Claimed
          </Badge>
        );
      case 'pending':
        return (
          <Badge 
            className="border-0 text-white shadow-sm"
            style={{ background: `linear-gradient(to right, ${getColor('accent3')}, ${getColor('accent3Light')})` }}
          >
            Pending
          </Badge>
        );
      default:
        return <Badge>{status}</Badge>;
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0
    }
  };

  return (
    <div className="py-8" style={{ backgroundColor: getColor('bgPrimary') }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
          className="mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 
            className="text-5xl md:text-6xl font-bold mb-3 bg-clip-text text-transparent"
            style={{
              backgroundImage: `linear-gradient(to right, ${getColor('accent1')}, ${getColor('accent1Light')})`,
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent'
            }}
          >
            Browse Found Items
          </h1>
          <p className="text-lg font-light" style={{ color: getColor('textSecondary') }}>
            Search through all reported items to find your lost belongings
          </p>
        </motion.div>

        {/* Search and Filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <Card 
            className="mb-6 shadow-lg border-0 backdrop-blur-sm rounded-2xl overflow-hidden"
            style={{ backgroundColor: getColor('bgCard') }}
          >
            <CardContent className="pt-6">
              <div className="space-y-4">
                {/* Search Bar */}
                <div className="relative">
                  <Search 
                    className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5"
                    style={{ color: getColor('accent1') }}
                  />
                  <Input
                    placeholder="Search by title, description, or location..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-12 pr-4 border-2 transition-colors h-14 rounded-xl text-base"
                    style={{
                      borderColor: getColor('border'),
                      backgroundColor: getColor('bgSecondary'),
                      color: getColor('textPrimary')
                    }}
                  />
                  {searchTerm && (
                    <button
                      onClick={() => setSearchTerm('')}
                      className="absolute right-4 top-1/2 -translate-y-1/2 transition-colors"
                      style={{ color: getColor('textTertiary') }}
                    >
                      <X className="h-5 w-5" />
                    </button>
                  )}
                </div>

                {/* Filters Row */}
                <div className="flex flex-wrap gap-3 items-center">
                  <div 
                    className="flex items-center gap-2 text-sm font-semibold"
                    style={{ color: getColor('textSecondary') }}
                  >
                    <SlidersHorizontal className="h-4 w-4" />
                    Filters:
                  </div>
                  
                  <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                    <SelectTrigger 
                      className="border-2 rounded-lg w-[180px] h-10"
                      style={{
                        borderColor: getColor('border'),
                        backgroundColor: getColor('bgSecondary'),
                        color: getColor('textPrimary')
                      }}
                    >
                      <Filter className="h-4 w-4 mr-2" style={{ color: getColor('accent1') }} />
                      <SelectValue placeholder="Category" />
                    </SelectTrigger>
                    <SelectContent>
                      {categories.map(cat => (
                        <SelectItem key={cat} value={cat}>
                          {cat === 'all' ? 'All Categories' : cat}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>

                  <Select value={statusFilter} onValueChange={setStatusFilter}>
                    <SelectTrigger 
                      className="border-2 rounded-lg w-[140px] h-10"
                      style={{
                        borderColor: getColor('border'),
                        backgroundColor: getColor('bgSecondary'),
                        color: getColor('textPrimary')
                      }}
                    >
                      <SelectValue placeholder="Status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Status</SelectItem>
                      <SelectItem value="approved">Available</SelectItem>
                      <SelectItem value="claimed">Claimed</SelectItem>
                      <SelectItem value="pending">Pending</SelectItem>
                    </SelectContent>
                  </Select>

                  <Select value={sortBy} onValueChange={setSortBy}>
                    <SelectTrigger 
                      className="border-2 rounded-lg w-[160px] h-10"
                      style={{
                        borderColor: getColor('border'),
                        backgroundColor: getColor('bgSecondary'),
                        color: getColor('textPrimary')
                      }}
                    >
                      <SelectValue placeholder="Sort" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="recent">Most Recent</SelectItem>
                      <SelectItem value="oldest">Oldest First</SelectItem>
                      <SelectItem value="title">Alphabetical</SelectItem>
                    </SelectContent>
                  </Select>

                  <div className="ml-auto flex items-center gap-2">
                    <Button
                      variant={viewMode === 'grid' ? 'default' : 'ghost'}
                      size="sm"
                      onClick={() => setViewMode('grid')}
                      className="rounded-lg"
                      style={viewMode === 'grid' ? {
                        background: `linear-gradient(to right, ${getColor('accent1')}, ${getColor('accent1Light')})`,
                        color: 'white'
                      } : {}}
                    >
                      <Grid3x3 className="h-4 w-4" />
                    </Button>
                    <Button
                      variant={viewMode === 'list' ? 'default' : 'ghost'}
                      size="sm"
                      onClick={() => setViewMode('list')}
                      className="rounded-lg"
                      style={viewMode === 'list' ? {
                        background: `linear-gradient(to right, ${getColor('accent1')}, ${getColor('accent1Light')})`,
                        color: 'white'
                      } : {}}
                    >
                      <List className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Results Count */}
        <motion.div 
          className="mb-6 flex items-center justify-between"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          <div className="flex items-center gap-2">
            <Package className="h-5 w-5" style={{ color: getColor('accent1') }} />
            <span className="font-semibold" style={{ color: getColor('textPrimary') }}>
              {filteredItems.length} {filteredItems.length === 1 ? 'item' : 'items'} found
            </span>
            {searchTerm && (
              <Badge 
                variant="outline"
                style={{
                  backgroundColor: `${getColor('accent1')}10`,
                  color: getColor('accent1'),
                  borderColor: `${getColor('accent1')}20`
                }}
              >
                "{searchTerm}"
              </Badge>
            )}
          </div>
        </motion.div>

        {/* Items Grid/List */}
        <AnimatePresence mode="wait">
          {filteredItems.length === 0 ? (
            <motion.div
              key="empty"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.3 }}
            >
              <Card 
                className="shadow-xl border-0 rounded-2xl backdrop-blur-sm"
                style={{ backgroundColor: getColor('bgCard') }}
              >
                <CardContent className="py-20 text-center">
                  <div 
                    className="w-28 h-28 rounded-full flex items-center justify-center mx-auto mb-6"
                    style={{ background: `linear-gradient(to bottom right, ${getColor('accent1')}10, ${getColor('accent1')}05)` }}
                  >
                    <Search className="h-14 w-14" style={{ color: `${getColor('accent1')}50` }} />
                  </div>
                  <h3 className="text-2xl font-bold mb-2" style={{ color: getColor('textPrimary') }}>
                    No items found
                  </h3>
                  <p className="mb-6" style={{ color: getColor('textSecondary') }}>
                    Try adjusting your search or filters
                  </p>
                  <Button 
                    onClick={() => {
                      setSearchTerm('');
                      setCategoryFilter('all');
                      setStatusFilter('approved');
                    }}
                    className="rounded-xl text-white"
                    style={{ background: `linear-gradient(to right, ${getColor('accent1')}, ${getColor('accent1Light')})` }}
                  >
                    Clear All Filters
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          ) : (
            <motion.div 
              key="grid"
              className={viewMode === 'grid' ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" : "space-y-4"}
              variants={containerVariants}
              initial="hidden"
              animate="visible"
            >
              {filteredItems.map((item, index) => (
                <motion.div
                  key={item.id}
                  variants={itemVariants}
                  custom={index}
                  whileHover={{ y: -8 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <Card 
                    className="overflow-hidden border-0 shadow-md hover:shadow-2xl transition-all duration-300 h-full flex flex-col backdrop-blur-sm rounded-2xl group"
                    style={{ backgroundColor: getColor('bgCard') }}
                  >
                    {item.imageUrl && (
                      <div 
                        className="h-56 overflow-hidden relative"
                        style={{ background: `linear-gradient(to bottom right, ${getColor('bgSecondary')}, ${getColor('bgSecondary')})` }}
                      >
                        <img 
                          src={item.imageUrl} 
                          alt={item.title}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                        <div className="absolute top-4 right-4">
                          {getStatusBadge(item.status)}
                        </div>
                      </div>
                    )}
                    {!item.imageUrl && (
                      <div 
                        className="h-56 flex items-center justify-center relative transition-all"
                        style={{ background: `linear-gradient(to bottom right, ${getColor('accent1')}10, ${getColor('accent1')}05)` }}
                      >
                        <Package className="h-20 w-20" style={{ color: `${getColor('accent1')}30` }} />
                        <div className="absolute top-4 right-4">
                          {getStatusBadge(item.status)}
                        </div>
                      </div>
                    )}
                    
                    <CardHeader className="flex-grow">
                      <div className="flex justify-between items-start mb-2">
                        <CardTitle 
                          className="text-xl line-clamp-1 transition-colors"
                          style={{ color: getColor('textPrimary') }}
                        >
                          {item.title}
                        </CardTitle>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        <Badge 
                          variant="outline"
                          style={{
                            backgroundColor: `${getColor('accent1')}10`,
                            color: getColor('accent1'),
                            borderColor: `${getColor('accent1')}20`
                          }}
                        >
                          {item.category}
                        </Badge>
                      </div>
                    </CardHeader>
                    
                    <CardContent className="flex-grow">
                      <p 
                        className="text-sm line-clamp-2 mb-4 leading-relaxed"
                        style={{ color: getColor('textSecondary') }}
                      >
                        {item.description}
                      </p>
                      <div className="space-y-2.5 text-sm" style={{ color: getColor('textSecondary') }}>
                        <div className="flex items-center">
                          <MapPin className="h-4 w-4 mr-2 flex-shrink-0" style={{ color: getColor('accent1') }} />
                          <span className="line-clamp-1">{item.location}</span>
                        </div>
                        <div className="flex items-center">
                          <Calendar className="h-4 w-4 mr-2 flex-shrink-0" style={{ color: getColor('accent1') }} />
                          <span>Found on {new Date(item.dateFound).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</span>
                        </div>
                        <div className="flex items-center">
                          <Clock className="h-4 w-4 mr-2 flex-shrink-0" style={{ color: getColor('accent3') }} />
                          <span>{Math.floor((Date.now() - new Date(item.createdAt).getTime()) / (1000 * 60 * 60 * 24))} days ago</span>
                        </div>
                      </div>
                    </CardContent>
                    
                    <CardFooter className="pt-4">
                      <Link to={`/item/${item.id}`} className="w-full">
                        <Button 
                          className="w-full shadow-md hover:shadow-lg transition-all rounded-xl h-11 font-semibold text-white"
                          style={{ background: `linear-gradient(to right, ${getColor('accent1')}, ${getColor('accent1Light')})` }}
                        >
                          <Eye className="mr-2 h-4 w-4" />
                          View Details & Claim
                        </Button>
                      </Link>
                    </CardFooter>
                  </Card>
                </motion.div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Quick Stats */}
        {filteredItems.length > 0 && (
          <motion.div
            className="mt-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <Card 
              className="border-0 shadow-xl rounded-2xl overflow-hidden relative"
              style={{ background: `linear-gradient(to right, ${getColor('accent1')}, ${getColor('accent1Light')})` }}
            >
              <CardContent className="p-8 relative">
                <div className="flex items-center justify-between text-white">
                  <div className="flex items-center gap-4">
                    <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center backdrop-blur-sm">
                      <TrendingUp className="h-8 w-8" />
                    </div>
                    <div>
                      <div className="text-sm opacity-90 font-medium">Success Rate</div>
                      <div className="text-4xl font-bold">
                        {items.length > 0 ? Math.round((items.filter(i => i.status === 'claimed').length / items.length) * 100) : 0}%
                      </div>
                    </div>
                  </div>
                  <div className="text-right max-w-md">
                    <div className="text-sm opacity-90 mb-1">Items have been successfully returned to their owners</div>
                    <div className="text-lg font-semibold">Keep searching - yours might be here</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        )}
      </div>
    </div>
  );
}
