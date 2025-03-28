
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { useToast } from "@/hooks/use-toast";
import { BookOpen, Clock, HelpCircle, PlusCircle, Save, X } from "lucide-react";

const CreateContentPage = () => {
  const { toast } = useToast();
  const [contentType, setContentType] = useState("quiz");
  const [questions, setQuestions] = useState([
    { id: 1, text: "", options: ["", "", "", ""], correctOption: 0, points: 5 }
  ]);
  
  const addQuestion = () => {
    const newId = questions.length > 0 ? Math.max(...questions.map(q => q.id)) + 1 : 1;
    setQuestions([
      ...questions,
      { id: newId, text: "", options: ["", "", "", ""], correctOption: 0, points: 5 }
    ]);
  };
  
  const removeQuestion = (id: number) => {
    if (questions.length > 1) {
      setQuestions(questions.filter(q => q.id !== id));
    } else {
      toast({
        title: "Cannot Remove",
        description: "You need at least one question in the content.",
        variant: "destructive"
      });
    }
  };
  
  const updateQuestion = (id: number, field: string, value: any) => {
    setQuestions(questions.map(q => 
      q.id === id ? { ...q, [field]: value } : q
    ));
  };
  
  const updateOption = (questionId: number, optionIndex: number, value: string) => {
    setQuestions(questions.map(q => 
      q.id === questionId 
        ? { 
            ...q, 
            options: q.options.map((opt, idx) => idx === optionIndex ? value : opt) 
          } 
        : q
    ));
  };
  
  const handleSave = () => {
    // Add validation logic here
    toast({
      title: "Content Saved",
      description: "Your content has been saved as a draft.",
    });
  };
  
  const handlePublish = () => {
    // Add validation logic here
    toast({
      title: "Content Published",
      description: "Your content has been published and is now available to students.",
    });
  };
  
  return (
    <div className="animate-fade-in max-w-4xl mx-auto">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Create New Content</h1>
          <p className="text-gray-600 mt-1">Design quizzes, tests, or practice sets for your students</p>
        </div>
      </div>
      
      <Tabs defaultValue="quiz" onValueChange={setContentType} className="mb-8">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="quiz">Quiz</TabsTrigger>
          <TabsTrigger value="practice">Practice Set</TabsTrigger>
          <TabsTrigger value="test">Test</TabsTrigger>
        </TabsList>
        
        <TabsContent value="quiz" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Create a New Quiz</CardTitle>
              <CardDescription>
                Create a quiz with multiple-choice questions. Students will receive immediate feedback.
              </CardDescription>
            </CardHeader>
          </Card>
        </TabsContent>
        
        <TabsContent value="practice" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Create a Practice Set</CardTitle>
              <CardDescription>
                Create a practice set for students to work on at their own pace. No time limits or grading.
              </CardDescription>
            </CardHeader>
          </Card>
        </TabsContent>
        
        <TabsContent value="test" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Create a Test</CardTitle>
              <CardDescription>
                Create a formal assessment with time limits and comprehensive grading.
              </CardDescription>
            </CardHeader>
          </Card>
        </TabsContent>
      </Tabs>
      
      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Basic Information</CardTitle>
          <CardDescription>
            Set up the basic details for your {contentType}.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 gap-4">
            <div>
              <Label htmlFor="title">Title</Label>
              <Input id="title" placeholder={`Enter ${contentType} title`} />
            </div>
            
            <div>
              <Label htmlFor="description">Description</Label>
              <Textarea id="description" placeholder="Provide a brief description" />
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="class">Class</Label>
                <Select>
                  <SelectTrigger id="class">
                    <SelectValue placeholder="Select a class" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="math-101">Math 101</SelectItem>
                    <SelectItem value="science-101">Science 101</SelectItem>
                    <SelectItem value="history-101">History 101</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              {(contentType === "quiz" || contentType === "test") && (
                <div>
                  <Label htmlFor="time-limit">Time Limit (minutes)</Label>
                  <Input id="time-limit" type="number" min="1" defaultValue={30} />
                </div>
              )}
            </div>
            
            {(contentType === "quiz" || contentType === "test") && (
              <div className="flex items-center space-x-2">
                <Switch id="shuffle" />
                <Label htmlFor="shuffle">Shuffle questions for each student</Label>
              </div>
            )}
            
            {contentType === "practice" && (
              <div className="flex items-center space-x-2">
                <Switch id="immediate-feedback" defaultChecked />
                <Label htmlFor="immediate-feedback">Show answers immediately after each question</Label>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
      
      <Card className="mb-8">
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle>Questions</CardTitle>
            <CardDescription>
              Add and configure the questions for your {contentType}.
            </CardDescription>
          </div>
          <Button onClick={addQuestion}>
            <PlusCircle className="h-4 w-4 mr-1" />
            Add Question
          </Button>
        </CardHeader>
        <CardContent className="space-y-6">
          {questions.map((question, index) => (
            <div key={question.id} className="p-4 border rounded-lg">
              <div className="flex justify-between items-start mb-4">
                <h3 className="text-lg font-medium">Question {index + 1}</h3>
                <Button 
                  variant="ghost" 
                  size="icon" 
                  onClick={() => removeQuestion(question.id)}
                  className="h-8 w-8"
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
              
              <div className="space-y-4">
                <div>
                  <Label htmlFor={`question-${question.id}`}>Question Text</Label>
                  <Textarea 
                    id={`question-${question.id}`} 
                    value={question.text}
                    onChange={(e) => updateQuestion(question.id, "text", e.target.value)}
                    placeholder="Enter your question here"
                  />
                </div>
                
                <div>
                  <Label>Answer Options</Label>
                  <div className="space-y-2 mt-2">
                    {question.options.map((option, optIndex) => (
                      <div key={optIndex} className="flex items-center gap-2">
                        <Input
                          value={option}
                          onChange={(e) => updateOption(question.id, optIndex, e.target.value)}
                          placeholder={`Option ${optIndex + 1}`}
                          className="flex-1"
                        />
                        <div className="flex items-center">
                          <input
                            type="radio"
                            name={`correct-${question.id}`}
                            checked={question.correctOption === optIndex}
                            onChange={() => updateQuestion(question.id, "correctOption", optIndex)}
                            className="mr-2"
                          />
                          <Label className="text-sm">Correct</Label>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                
                <div>
                  <Label htmlFor={`points-${question.id}`}>Points</Label>
                  <Input
                    id={`points-${question.id}`}
                    type="number"
                    min="1"
                    value={question.points}
                    onChange={(e) => updateQuestion(question.id, "points", Number(e.target.value))}
                    className="w-24"
                  />
                </div>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>
      
      <div className="flex justify-end gap-3">
        <Button variant="outline" onClick={handleSave}>
          <Save className="h-4 w-4 mr-1" />
          Save Draft
        </Button>
        <Button onClick={handlePublish}>
          Publish {contentType.charAt(0).toUpperCase() + contentType.slice(1)}
        </Button>
      </div>
    </div>
  );
};

export default CreateContentPage;
