"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  MessageSquare,
  FileText,
  Users,
  AlertTriangle,
  UserPlus,
  Bell,
  Pin,
  Reply,
  Edit,
  Trash2,
  Share2,
  Tag,
  Calendar,
  Send,
  Paperclip,
  AtSign,
} from "lucide-react"

interface CaseCollaborationProps {
  caseId: string
}

interface Comment {
  id: string
  author: string
  authorInitials: string
  role: string
  content: string
  timestamp: string
  type: "comment" | "note" | "update" | "mention"
  priority?: "low" | "medium" | "high" | "urgent"
  tags?: string[]
  attachments?: string[]
  mentions?: string[]
  isPinned?: boolean
  replies?: Comment[]
}

interface TeamMember {
  id: string
  name: string
  initials: string
  role: string
  department: string
  isOnline: boolean
}

export function CaseCollaboration({ caseId }: CaseCollaborationProps) {
  const [newComment, setNewComment] = useState("")
  const [commentType, setCommentType] = useState<"comment" | "note" | "update">("comment")
  const [commentPriority, setCommentPriority] = useState<"low" | "medium" | "high" | "urgent">("medium")
  const [selectedTags, setSelectedTags] = useState<string[]>([])
  const [mentionedUsers, setMentionedUsers] = useState<string[]>([])
  const [showMentionDialog, setShowMentionDialog] = useState(false)
  const [replyingTo, setReplyingTo] = useState<string | null>(null)
  const [editingComment, setEditingComment] = useState<string | null>(null)

  const teamMembers: TeamMember[] = [
    {
      id: "1",
      name: "Tendai Mukamuri",
      initials: "TM",
      role: "Senior Investigator",
      department: "Fraud Investigation",
      isOnline: true,
    },
    {
      id: "2",
      name: "Chipo Nyathi",
      initials: "CN",
      role: "Fraud Analyst",
      department: "Risk Management",
      isOnline: true,
    },
    {
      id: "3",
      name: "Blessing Moyo",
      initials: "BM",
      role: "Compliance Officer",
      department: "Compliance",
      isOnline: false,
    },
    {
      id: "4",
      name: "Tatenda Sibanda",
      initials: "TS",
      role: "Risk Manager",
      department: "Risk Management",
      isOnline: true,
    },
    { id: "5", name: "Rumbidzai Dube", initials: "RD", role: "AML Specialist", department: "AML", isOnline: false },
    { id: "6", name: "Farai Ncube", initials: "FN", role: "Senior Analyst", department: "Analytics", isOnline: true },
    {
      id: "7",
      name: "Precious Mpofu",
      initials: "PM",
      role: "Investigation Lead",
      department: "Fraud Investigation",
      isOnline: true,
    },
    {
      id: "8",
      name: "Takudzwa Chirwa",
      initials: "TC",
      role: "Compliance Analyst",
      department: "Compliance",
      isOnline: false,
    },
  ]

  const [comments, setComments] = useState<Comment[]>([
    {
      id: "1",
      author: "Tendai Mukamuri",
      authorInitials: "TM",
      role: "Senior Investigator",
      content:
        "I've reviewed the transaction patterns and identified several red flags. The timing of these transfers suggests coordinated activity. We should escalate this to the AML team for further investigation.",
      timestamp: "2024-01-15T16:45:00Z",
      type: "note",
      priority: "high",
      tags: ["Investigation", "AML", "Escalation"],
      isPinned: true,
      replies: [
        {
          id: "1-1",
          author: "Rumbidzai Dube",
          authorInitials: "RD",
          role: "AML Specialist",
          content: "Thanks for the escalation, Tendai. I'll review the case and provide my assessment by end of day.",
          timestamp: "2024-01-15T17:15:00Z",
          type: "comment",
          mentions: ["Tendai Mukamuri"],
        },
      ],
    },
    {
      id: "2",
      author: "Chipo Nyathi",
      authorInitials: "CN",
      role: "Fraud Analyst",
      content:
        "Customer contact attempted - called regarding suspicious activity. No response received, left detailed voicemail requesting callback within 24 hours. Will attempt contact again tomorrow morning.",
      timestamp: "2024-01-15T14:30:00Z",
      type: "update",
      priority: "medium",
      tags: ["Customer Contact", "Follow-up"],
      attachments: ["call_log_20240115.pdf"],
    },
    {
      id: "3",
      author: "Blessing Moyo",
      authorInitials: "BM",
      role: "Compliance Officer",
      content:
        "Regulatory filing requirements: This case may require SAR filing if investigation confirms suspicious activity. Please ensure all documentation is properly maintained for potential regulatory submission.",
      timestamp: "2024-01-15T13:20:00Z",
      type: "note",
      priority: "urgent",
      tags: ["Regulatory", "SAR", "Documentation"],
      isPinned: true,
    },
    {
      id: "4",
      author: "Farai Ncube",
      authorInitials: "FN",
      role: "Senior Analyst",
      content:
        "Analytics update: Risk score has increased from 8.5 to 9.2 based on new transaction data. Pattern analysis shows 87% similarity to known money laundering schemes in our database.",
      timestamp: "2024-01-15T12:10:00Z",
      type: "update",
      priority: "high",
      tags: ["Analytics", "Risk Score", "Pattern Analysis"],
    },
  ])

  const availableTags = [
    "Investigation",
    "AML",
    "Escalation",
    "Customer Contact",
    "Follow-up",
    "Regulatory",
    "SAR",
    "Documentation",
    "Analytics",
    "Risk Score",
    "Pattern Analysis",
    "Evidence",
    "Compliance",
    "Urgent",
    "Review",
  ]

  const handleAddComment = () => {
    if (newComment.trim()) {
      const comment: Comment = {
        id: Date.now().toString(),
        author: "Tendai Mukamuri", // Current user
        authorInitials: "TM",
        role: "Senior Investigator",
        content: newComment,
        timestamp: new Date().toISOString(),
        type: commentType,
        priority: commentPriority,
        tags: selectedTags,
        mentions: mentionedUsers,
      }

      if (replyingTo) {
        setComments((prev) =>
          prev.map((c) => {
            if (c.id === replyingTo) {
              return {
                ...c,
                replies: [...(c.replies || []), comment],
              }
            }
            return c
          }),
        )
        setReplyingTo(null)
      } else {
        setComments((prev) => [comment, ...prev])
      }

      setNewComment("")
      setSelectedTags([])
      setMentionedUsers([])
      setCommentType("comment")
      setCommentPriority("medium")
    }
  }

  const handlePinComment = (commentId: string) => {
    setComments((prev) => prev.map((c) => (c.id === commentId ? { ...c, isPinned: !c.isPinned } : c)))
  }

  const handleDeleteComment = (commentId: string) => {
    setComments((prev) => prev.filter((c) => c.id !== commentId))
  }

  const formatTimestamp = (timestamp: string) => {
    const date = new Date(timestamp)
    const now = new Date()
    const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60))

    if (diffInHours < 1) return "Just now"
    if (diffInHours < 24) return `${diffInHours}h ago`
    return date.toLocaleDateString() + " " + date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
  }

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "note":
        return <FileText className="h-4 w-4" />
      case "update":
        return <AlertTriangle className="h-4 w-4" />
      case "mention":
        return <AtSign className="h-4 w-4" />
      default:
        return <MessageSquare className="h-4 w-4" />
    }
  }

  const getPriorityColor = (priority?: string) => {
    switch (priority) {
      case "urgent":
        return "bg-red-100 text-red-800 border-red-200"
      case "high":
        return "bg-orange-100 text-orange-800 border-orange-200"
      case "medium":
        return "bg-blue-100 text-blue-800 border-blue-200"
      case "low":
        return "bg-gray-100 text-gray-800 border-gray-200"
      default:
        return "bg-gray-100 text-gray-800 border-gray-200"
    }
  }

  const renderComment = (comment: Comment, isReply = false) => (
    <div key={comment.id} className={`${isReply ? "ml-8 border-l-2 border-gray-200 pl-4" : ""} mb-4`}>
      <div className="flex items-start gap-3">
        <Avatar className="h-8 w-8 flex-shrink-0">
          <AvatarFallback className="text-xs">{comment.authorInitials}</AvatarFallback>
        </Avatar>

        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <span className="font-medium text-sm">{comment.author}</span>
            <Badge variant="outline" className="text-xs">
              {comment.role}
            </Badge>
            {getTypeIcon(comment.type)}
            {comment.priority && (
              <Badge className={`text-xs ${getPriorityColor(comment.priority)}`}>{comment.priority}</Badge>
            )}
            {comment.isPinned && <Pin className="h-3 w-3 text-blue-500" />}
            <span className="text-xs text-gray-500 ml-auto">{formatTimestamp(comment.timestamp)}</span>
          </div>

          <div className="bg-gray-50 rounded-lg p-3 mb-2">
            <p className="text-sm text-gray-700">{comment.content}</p>

            {comment.attachments && comment.attachments.length > 0 && (
              <div className="flex items-center gap-2 mt-2 pt-2 border-t border-gray-200">
                <Paperclip className="h-3 w-3 text-gray-400" />
                {comment.attachments.map((attachment, index) => (
                  <Badge key={index} variant="outline" className="text-xs">
                    {attachment}
                  </Badge>
                ))}
              </div>
            )}

            {comment.mentions && comment.mentions.length > 0 && (
              <div className="flex items-center gap-2 mt-2 pt-2 border-t border-gray-200">
                <AtSign className="h-3 w-3 text-blue-500" />
                {comment.mentions.map((mention, index) => (
                  <Badge key={index} className="text-xs bg-blue-100 text-blue-800">
                    {mention}
                  </Badge>
                ))}
              </div>
            )}
          </div>

          {comment.tags && comment.tags.length > 0 && (
            <div className="flex flex-wrap gap-1 mb-2">
              {comment.tags.map((tag, index) => (
                <Badge key={index} variant="secondary" className="text-xs">
                  <Tag className="h-2 w-2 mr-1" />
                  {tag}
                </Badge>
              ))}
            </div>
          )}

          <div className="flex items-center gap-2 text-xs">
            <Button variant="ghost" size="sm" className="h-6 px-2" onClick={() => setReplyingTo(comment.id)}>
              <Reply className="h-3 w-3 mr-1" />
              Reply
            </Button>
            <Button variant="ghost" size="sm" className="h-6 px-2" onClick={() => handlePinComment(comment.id)}>
              <Pin className="h-3 w-3 mr-1" />
              {comment.isPinned ? "Unpin" : "Pin"}
            </Button>
            <Button variant="ghost" size="sm" className="h-6 px-2" onClick={() => setEditingComment(comment.id)}>
              <Edit className="h-3 w-3 mr-1" />
              Edit
            </Button>
            <Button
              variant="ghost"
              size="sm"
              className="h-6 px-2 text-red-600 hover:text-red-700"
              onClick={() => handleDeleteComment(comment.id)}
            >
              <Trash2 className="h-3 w-3 mr-1" />
              Delete
            </Button>
          </div>

          {comment.replies && comment.replies.length > 0 && (
            <div className="mt-3">{comment.replies.map((reply) => renderComment(reply, true))}</div>
          )}
        </div>
      </div>
    </div>
  )

  return (
    <div className="space-y-6">
      {/* Team Members & Activity Overview */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Users className="h-5 w-5" />
              Active Team Members
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {teamMembers
                .filter((member) => member.isOnline)
                .map((member) => (
                  <div key={member.id} className="flex items-center gap-2 p-2 rounded-lg bg-gray-50">
                    <div className="relative">
                      <Avatar className="h-8 w-8">
                        <AvatarFallback className="text-xs">{member.initials}</AvatarFallback>
                      </Avatar>
                      <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></div>
                    </div>
                    <div className="min-w-0">
                      <p className="text-xs font-medium truncate">{member.name}</p>
                      <p className="text-xs text-gray-500 truncate">{member.role}</p>
                    </div>
                  </div>
                ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Bell className="h-5 w-5" />
              Activity Summary
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-sm">Total Comments</span>
              <Badge>{comments.length}</Badge>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm">Pinned Items</span>
              <Badge>{comments.filter((c) => c.isPinned).length}</Badge>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm">Team Members</span>
              <Badge>{teamMembers.filter((m) => m.isOnline).length} online</Badge>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm">Last Activity</span>
              <span className="text-xs text-gray-500">2h ago</span>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Collaboration Tabs */}
      <Tabs defaultValue="comments" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="comments">All Comments</TabsTrigger>
          <TabsTrigger value="notes">Investigation Notes</TabsTrigger>
          <TabsTrigger value="updates">Status Updates</TabsTrigger>
          <TabsTrigger value="mentions">Mentions</TabsTrigger>
        </TabsList>

        <TabsContent value="comments" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span className="flex items-center gap-2">
                  <MessageSquare className="h-5 w-5" />
                  Case Discussion
                </span>
                <div className="flex gap-2">
                  <Dialog open={showMentionDialog} onOpenChange={setShowMentionDialog}>
                    <DialogTrigger asChild>
                      <Button variant="outline" size="sm">
                        <UserPlus className="h-4 w-4 mr-2" />
                        Mention Team
                      </Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Mention Team Members</DialogTitle>
                      </DialogHeader>
                      <div className="space-y-3">
                        {teamMembers.map((member) => (
                          <div key={member.id} className="flex items-center gap-3">
                            <Avatar className="h-8 w-8">
                              <AvatarFallback className="text-xs">{member.initials}</AvatarFallback>
                            </Avatar>
                            <div className="flex-1">
                              <p className="text-sm font-medium">{member.name}</p>
                              <p className="text-xs text-gray-500">
                                {member.role} - {member.department}
                              </p>
                            </div>
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => {
                                setMentionedUsers((prev) =>
                                  prev.includes(member.name)
                                    ? prev.filter((name) => name !== member.name)
                                    : [...prev, member.name],
                                )
                              }}
                            >
                              {mentionedUsers.includes(member.name) ? "Remove" : "Mention"}
                            </Button>
                          </div>
                        ))}
                      </div>
                    </DialogContent>
                  </Dialog>
                  <Button variant="outline" size="sm">
                    <Share2 className="h-4 w-4 mr-2" />
                    Share Case
                  </Button>
                </div>
              </CardTitle>
            </CardHeader>
            <CardContent>
              {/* Add Comment Form */}
              <div className="space-y-4 mb-6 p-4 bg-gray-50 rounded-lg">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <Select
                    value={commentType}
                    onValueChange={(value: "comment" | "note" | "update") => setCommentType(value)}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="comment">Comment</SelectItem>
                      <SelectItem value="note">Investigation Note</SelectItem>
                      <SelectItem value="update">Status Update</SelectItem>
                    </SelectContent>
                  </Select>

                  <Select
                    value={commentPriority}
                    onValueChange={(value: "low" | "medium" | "high" | "urgent") => setCommentPriority(value)}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="low">Low Priority</SelectItem>
                      <SelectItem value="medium">Medium Priority</SelectItem>
                      <SelectItem value="high">High Priority</SelectItem>
                      <SelectItem value="urgent">Urgent</SelectItem>
                    </SelectContent>
                  </Select>

                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Add tags..." />
                    </SelectTrigger>
                    <SelectContent>
                      {availableTags.map((tag) => (
                        <SelectItem key={tag} value={tag}>
                          {tag}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {mentionedUsers.length > 0 && (
                  <div className="flex flex-wrap gap-2">
                    <span className="text-sm text-gray-600">Mentioning:</span>
                    {mentionedUsers.map((user, index) => (
                      <Badge key={index} className="bg-blue-100 text-blue-800">
                        <AtSign className="h-3 w-3 mr-1" />
                        {user}
                      </Badge>
                    ))}
                  </div>
                )}

                <Textarea
                  placeholder={replyingTo ? "Write a reply..." : "Add a comment, note, or update..."}
                  value={newComment}
                  onChange={(e) => setNewComment(e.target.value)}
                  className="min-h-[100px]"
                />

                <div className="flex items-center justify-between">
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm">
                      <Paperclip className="h-4 w-4 mr-2" />
                      Attach File
                    </Button>
                    <Button variant="outline" size="sm">
                      <Calendar className="h-4 w-4 mr-2" />
                      Schedule
                    </Button>
                  </div>
                  <Button onClick={handleAddComment}>
                    <Send className="h-4 w-4 mr-2" />
                    {replyingTo ? "Reply" : "Post"}
                  </Button>
                </div>
              </div>

              {/* Comments List */}
              <div className="space-y-4">
                {/* Pinned Comments */}
                {comments.filter((c) => c.isPinned).length > 0 && (
                  <div className="border-b border-gray-200 pb-4 mb-4">
                    <h3 className="text-sm font-medium text-gray-600 mb-3 flex items-center gap-2">
                      <Pin className="h-4 w-4" />
                      Pinned Items
                    </h3>
                    {comments.filter((c) => c.isPinned).map((comment) => renderComment(comment))}
                  </div>
                )}

                {/* Regular Comments */}
                {comments.filter((c) => !c.isPinned).map((comment) => renderComment(comment))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="notes" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="h-5 w-5" />
                Investigation Notes
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {comments.filter((c) => c.type === "note").map((comment) => renderComment(comment))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="updates" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <AlertTriangle className="h-5 w-5" />
                Status Updates
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {comments.filter((c) => c.type === "update").map((comment) => renderComment(comment))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="mentions" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <AtSign className="h-5 w-5" />
                Mentions & Notifications
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {comments.filter((c) => c.mentions && c.mentions.length > 0).map((comment) => renderComment(comment))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
