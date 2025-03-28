
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { ArrowLeft, Download, Filter, Plus, Search, UserPlus, X } from "lucide-react";
import { Link } from "react-router-dom";
import { 
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
  DialogClose
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

// Mock student data
const studentsData = [
  { id: "s1", name: "Alex Johnson", rollNumber: "S001", email: "alex.j@example.com", grade: "10", classes: ["Math 101", "Science 101", "History 101"], status: "active" },
  { id: "s2", name: "Taylor Smith", rollNumber: "S002", email: "t.smith@example.com", grade: "10", classes: ["Math 101", "Science 101"], status: "active" },
  { id: "s3", name: "Jordan Lee", rollNumber: "S003", email: "j.lee@example.com", grade: "11", classes: ["Physics 101", "Math 201", "History 101"], status: "active" },
  { id: "s4", name: "Casey Brown", rollNumber: "S004", email: "c.brown@example.com", grade: "9", classes: ["Math 101", "Science 101", "English 101"], status: "inactive" },
  { id: "s5", name: "Riley Wilson", rollNumber: "S005", email: "r.wilson@example.com", grade: "11", classes: ["Physics 101", "Chemistry 101", "English 201"], status: "active" },
  { id: "s6", name: "Jamie Garcia", rollNumber: "S006", email: "j.garcia@example.com", grade: "9", classes: ["Math 101", "Biology 101", "Geography 101"], status: "active" },
  { id: "s7", name: "Drew Martin", rollNumber: "S007", email: "d.martin@example.com", grade: "10", classes: ["Math 101", "Chemistry 101", "English 101"], status: "active" },
  { id: "s8", name: "Avery Thomas", rollNumber: "S008", email: "a.thomas@example.com", grade: "12", classes: ["Physics 201", "Math 301", "History 201"], status: "active" },
];

// Available classes
const classOptions = [
  "Math 101", "Science 101", "History 101", "English 101", 
  "Math 201", "Physics 101", "Chemistry 101", "Biology 101", 
  "Geography 101", "English 201", "Math 301", "Physics 201", "History 201"
];

type StudentRowProps = {
  student: typeof studentsData[0];
  onEditClick: (student: typeof studentsData[0]) => void;
  onDeleteClick: (studentId: string) => void;
};

const StudentRow = ({ student, onEditClick, onDeleteClick }: StudentRowProps) => (
  <tr className="border-b">
    <td className="px-4 py-3 text-sm">
      <Link to={`/student/${student.id}`} className="font-medium text-teacher-primary hover:underline">
        {student.name}
      </Link>
    </td>
    <td className="px-4 py-3 text-sm">{student.rollNumber}</td>
    <td className="px-4 py-3 text-sm">{student.email}</td>
    <td className="px-4 py-3 text-sm">{student.grade}</td>
    <td className="px-4 py-3 text-sm">{student.classes.join(", ")}</td>
    <td className="px-4 py-3 text-sm">
      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium
        ${student.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}`}>
        {student.status === 'active' ? 'Active' : 'Inactive'}
      </span>
    </td>
    <td className="px-4 py-3 text-sm">
      <div className="flex items-center gap-2">
        <Button variant="ghost" size="sm" onClick={() => onEditClick(student)}>
          Edit
        </Button>
        <Button variant="ghost" size="sm" className="text-red-500" onClick={() => onDeleteClick(student.id)}>
          Delete
        </Button>
      </div>
    </td>
  </tr>
);

const ManageStudentsPage = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedGrade, setSelectedGrade] = useState<string>("all");
  const [selectedStatus, setSelectedStatus] = useState<string>("all");
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [currentStudent, setCurrentStudent] = useState<typeof studentsData[0] | null>(null);

  // Filter students based on search query and filters
  const filteredStudents = studentsData.filter(student => {
    const matchesSearch = 
      student.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      student.rollNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
      student.email.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesGrade = selectedGrade === "all" || student.grade === selectedGrade;
    const matchesStatus = selectedStatus === "all" || student.status === selectedStatus;
    
    return matchesSearch && matchesGrade && matchesStatus;
  });

  const handleEditClick = (student: typeof studentsData[0]) => {
    setCurrentStudent(student);
    setIsEditDialogOpen(true);
  };

  const handleDeleteClick = (studentId: string) => {
    const student = studentsData.find(s => s.id === studentId);
    setCurrentStudent(student || null);
    setIsDeleteDialogOpen(true);
  };

  const clearFilters = () => {
    setSearchQuery("");
    setSelectedGrade("all");
    setSelectedStatus("all");
  };

  return (
    <div className="animate-fade-in">
      <div className="mb-8">
        <Link to="/" className="flex items-center text-gray-500 hover:text-teacher-primary mb-4">
          <ArrowLeft className="h-4 w-4 mr-1" />
          Back to Dashboard
        </Link>
        
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-gray-800">Manage Students</h1>
            <p className="text-gray-600 mt-1">Add, edit, or remove student records</p>
          </div>
          
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm">
              <Download className="h-4 w-4 mr-1" />
              Export
            </Button>
            
            <Button size="sm" onClick={() => setIsAddDialogOpen(true)}>
              <UserPlus className="h-4 w-4 mr-1" />
              Add Student
            </Button>
          </div>
        </div>
      </div>
      
      <Card className="mb-8">
        <div className="p-6 space-y-4">
          <div className="flex flex-col md:flex-row md:items-end gap-4">
            <div className="flex-1">
              <Label htmlFor="search-students" className="mb-2 block">Search Students</Label>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500" />
                <Input 
                  id="search-students" 
                  placeholder="Search by name, ID, or email" 
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-9"
                />
              </div>
            </div>
            
            <div className="w-full md:w-48">
              <Label htmlFor="grade-filter" className="mb-2 block">Grade</Label>
              <Select value={selectedGrade} onValueChange={setSelectedGrade}>
                <SelectTrigger id="grade-filter">
                  <SelectValue placeholder="All Grades" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Grades</SelectItem>
                  <SelectItem value="9">Grade 9</SelectItem>
                  <SelectItem value="10">Grade 10</SelectItem>
                  <SelectItem value="11">Grade 11</SelectItem>
                  <SelectItem value="12">Grade 12</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="w-full md:w-48">
              <Label htmlFor="status-filter" className="mb-2 block">Status</Label>
              <Select value={selectedStatus} onValueChange={setSelectedStatus}>
                <SelectTrigger id="status-filter">
                  <SelectValue placeholder="All Statuses" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Statuses</SelectItem>
                  <SelectItem value="active">Active</SelectItem>
                  <SelectItem value="inactive">Inactive</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <Button variant="outline" onClick={clearFilters} className="h-10">
              <X className="h-4 w-4 mr-1" />
              Clear
            </Button>
          </div>
          
          {(selectedGrade !== "all" || selectedStatus !== "all") && (
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <Filter className="h-4 w-4" />
              <span>Filters applied:</span>
              {selectedGrade !== "all" && (
                <span className="bg-gray-100 px-2 py-1 rounded">Grade: {selectedGrade}</span>
              )}
              {selectedStatus !== "all" && (
                <span className="bg-gray-100 px-2 py-1 rounded">Status: {selectedStatus}</span>
              )}
            </div>
          )}
        </div>
      </Card>
      
      <Card>
        <Tabs defaultValue="list" className="w-full">
          <div className="px-6 pt-6">
            <TabsList className="mb-4">
              <TabsTrigger value="list">Student List</TabsTrigger>
              <TabsTrigger value="classes">Class Assignments</TabsTrigger>
            </TabsList>
          </div>
          
          <TabsContent value="list">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 text-left">
                  <tr>
                    <th className="px-4 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                    <th className="px-4 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
                    <th className="px-4 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                    <th className="px-4 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">Grade</th>
                    <th className="px-4 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">Classes</th>
                    <th className="px-4 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                    <th className="px-4 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredStudents.length > 0 ? (
                    filteredStudents.map(student => (
                      <StudentRow 
                        key={student.id} 
                        student={student}
                        onEditClick={handleEditClick}
                        onDeleteClick={handleDeleteClick}
                      />
                    ))
                  ) : (
                    <tr>
                      <td colSpan={7} className="px-4 py-8 text-center text-gray-500">
                        No students found matching your criteria.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </TabsContent>
          
          <TabsContent value="classes">
            <div className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {["Math 101", "Science 101", "History 101", "English 101"].map(className => {
                  const studentsInClass = studentsData.filter(student => 
                    student.classes.includes(className)
                  );
                  
                  return (
                    <Card key={className} className="overflow-hidden">
                      <div className="p-4 bg-gray-50 border-b font-medium">
                        {className}
                        <span className="ml-2 text-sm text-gray-500">
                          ({studentsInClass.length} students)
                        </span>
                      </div>
                      <div className="p-4">
                        <div className="max-h-60 overflow-y-auto space-y-2">
                          {studentsInClass.map(student => (
                            <div key={student.id} className="flex justify-between items-center py-2 border-b last:border-0">
                              <Link 
                                to={`/student/${student.id}`}
                                className="font-medium text-teacher-primary hover:underline"
                              >
                                {student.name}
                              </Link>
                              <span className="text-sm text-gray-500">{student.rollNumber}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </Card>
                  );
                })}
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </Card>

      {/* Add Student Dialog */}
      <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
        <DialogContent className="sm:max-w-[525px]">
          <DialogHeader>
            <DialogTitle>Add New Student</DialogTitle>
            <DialogDescription>
              Enter the student's information below. All fields are required.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="first-name">First Name</Label>
                <Input id="first-name" placeholder="First name" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="last-name">Last Name</Label>
                <Input id="last-name" placeholder="Last name" />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input id="email" placeholder="student@example.com" type="email" />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="roll-number">Roll Number</Label>
                <Input id="roll-number" placeholder="S000" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="grade">Grade</Label>
                <Select>
                  <SelectTrigger id="grade">
                    <SelectValue placeholder="Select grade" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="9">Grade 9</SelectItem>
                    <SelectItem value="10">Grade 10</SelectItem>
                    <SelectItem value="11">Grade 11</SelectItem>
                    <SelectItem value="12">Grade 12</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="classes">Assign Classes</Label>
              <Select>
                <SelectTrigger id="classes">
                  <SelectValue placeholder="Select classes" />
                </SelectTrigger>
                <SelectContent>
                  {classOptions.map(classOption => (
                    <SelectItem key={classOption} value={classOption}>
                      {classOption}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <div className="flex flex-wrap gap-2 mt-2">
                <div className="bg-gray-100 text-gray-800 px-2 py-1 rounded text-sm flex items-center">
                  Math 101
                  <button className="ml-1 text-gray-500 hover:text-gray-700">
                    <X className="h-3 w-3" />
                  </button>
                </div>
              </div>
            </div>
          </div>
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline">Cancel</Button>
            </DialogClose>
            <Button>Add Student</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Edit Student Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="sm:max-w-[525px]">
          <DialogHeader>
            <DialogTitle>Edit Student</DialogTitle>
            <DialogDescription>
              Update the student's information.
            </DialogDescription>
          </DialogHeader>
          {currentStudent && (
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="edit-first-name">First Name</Label>
                  <Input 
                    id="edit-first-name" 
                    defaultValue={currentStudent.name.split(' ')[0]} 
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="edit-last-name">Last Name</Label>
                  <Input 
                    id="edit-last-name" 
                    defaultValue={currentStudent.name.split(' ')[1] || ''} 
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="edit-email">Email</Label>
                <Input 
                  id="edit-email" 
                  defaultValue={currentStudent.email} 
                  type="email" 
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="edit-roll-number">Roll Number</Label>
                  <Input 
                    id="edit-roll-number" 
                    defaultValue={currentStudent.rollNumber} 
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="edit-grade">Grade</Label>
                  <Select defaultValue={currentStudent.grade}>
                    <SelectTrigger id="edit-grade">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="9">Grade 9</SelectItem>
                      <SelectItem value="10">Grade 10</SelectItem>
                      <SelectItem value="11">Grade 11</SelectItem>
                      <SelectItem value="12">Grade 12</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="edit-status">Status</Label>
                <Select defaultValue={currentStudent.status}>
                  <SelectTrigger id="edit-status">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="active">Active</SelectItem>
                    <SelectItem value="inactive">Inactive</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>Assigned Classes</Label>
                <div className="flex flex-wrap gap-2 mt-2">
                  {currentStudent.classes.map(cls => (
                    <div key={cls} className="bg-gray-100 text-gray-800 px-2 py-1 rounded text-sm flex items-center">
                      {cls}
                      <button className="ml-1 text-gray-500 hover:text-gray-700">
                        <X className="h-3 w-3" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline">Cancel</Button>
            </DialogClose>
            <Button>Save Changes</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Confirm Deletion</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete the student record for {currentStudent?.name}? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline">Cancel</Button>
            </DialogClose>
            <Button variant="destructive">Delete Student</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ManageStudentsPage;
