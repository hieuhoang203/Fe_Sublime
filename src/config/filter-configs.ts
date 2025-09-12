import { FilterConfig } from "@/components/ui/generic-filter";

// Song Filter Config
export const songFilterConfig: FilterConfig = {
  title: "Filter Songs",
  fields: [
    {
      key: "search",
      label: "Search",
      type: "text",
      placeholder: "Search by title, artist...",
      gridCols: 2,
    },
    {
      key: "status",
      label: "Status",
      type: "select",
      options: [
        { value: "", label: "All Status" },
        { value: "pending", label: "Pending" },
        { value: "approved", label: "Approved" },
        { value: "rejected", label: "Rejected" },
      ],
    },
    {
      key: "genre",
      label: "Genre",
      type: "select",
      options: [
        { value: "", label: "All Genres" },
        { value: "pop", label: "Pop" },
        { value: "electronic", label: "Electronic" },
        { value: "hip-hop", label: "Hip Hop" },
        { value: "ambient", label: "Ambient" },
        { value: "rock", label: "Rock" },
        { value: "jazz", label: "Jazz" },
        { value: "classical", label: "Classical" },
      ],
    },
    {
      key: "artist",
      label: "Artist",
      type: "select",
      options: [
        { value: "", label: "All Artists" },
        { value: "John Doe", label: "John Doe" },
        { value: "Jane Smith", label: "Jane Smith" },
        { value: "Mike Johnson", label: "Mike Johnson" },
        { value: "Sarah Wilson", label: "Sarah Wilson" },
      ],
    },
    {
      key: "dateFrom",
      label: "From Date",
      type: "date",
    },
    {
      key: "dateTo",
      label: "To Date",
      type: "date",
    },
    {
      key: "minPlays",
      label: "Min Plays",
      type: "number",
      placeholder: "0",
    },
    {
      key: "maxPlays",
      label: "Max Plays",
      type: "number",
      placeholder: "1000000",
    },
  ],
};

// User Filter Config
export const userFilterConfig: FilterConfig = {
  title: "Filter Users",
  fields: [
    {
      key: "search",
      label: "Search",
      type: "text",
      placeholder: "Search by name, email...",
      gridCols: 2,
    },
    {
      key: "status",
      label: "Status",
      type: "select",
      options: [
        { value: "", label: "All Status" },
        { value: "active", label: "Active" },
        { value: "inactive", label: "Inactive" },
        { value: "banned", label: "Banned" },
      ],
    },
    {
      key: "role",
      label: "Role",
      type: "select",
      options: [
        { value: "", label: "All Roles" },
        { value: "user", label: "User" },
        { value: "artist", label: "Artist" },
        { value: "admin", label: "Admin" },
      ],
    },
    {
      key: "dateFrom",
      label: "Joined From",
      type: "date",
    },
    {
      key: "dateTo",
      label: "Joined To",
      type: "date",
    },
  ],
};

// Artist Filter Config
export const artistFilterConfig: FilterConfig = {
  title: "Filter Artists",
  fields: [
    {
      key: "search",
      label: "Search",
      type: "text",
      placeholder: "Search by name, email...",
      gridCols: 2,
    },
    {
      key: "status",
      label: "Status",
      type: "select",
      options: [
        { value: "", label: "All Status" },
        { value: "active", label: "Active" },
        { value: "inactive", label: "Inactive" },
        { value: "pending", label: "Pending Verification" },
      ],
    },
    {
      key: "verified",
      label: "Verification",
      type: "select",
      options: [
        { value: "", label: "All" },
        { value: "verified", label: "Verified" },
        { value: "unverified", label: "Unverified" },
      ],
    },
    {
      key: "dateFrom",
      label: "Joined From",
      type: "date",
    },
    {
      key: "dateTo",
      label: "Joined To",
      type: "date",
    },
  ],
};

// Album Filter Config
export const albumFilterConfig: FilterConfig = {
  title: "Filter Albums",
  fields: [
    {
      key: "search",
      label: "Search",
      type: "text",
      placeholder: "Search by title, artist...",
      gridCols: 2,
    },
    {
      key: "status",
      label: "Status",
      type: "select",
      options: [
        { value: "", label: "All Status" },
        { value: "published", label: "Published" },
        { value: "draft", label: "Draft" },
        { value: "archived", label: "Archived" },
      ],
    },
    {
      key: "artist",
      label: "Artist",
      type: "select",
      options: [
        { value: "", label: "All Artists" },
        { value: "John Doe", label: "John Doe" },
        { value: "Jane Smith", label: "Jane Smith" },
        { value: "Mike Johnson", label: "Mike Johnson" },
        { value: "Sarah Wilson", label: "Sarah Wilson" },
      ],
    },
    {
      key: "dateFrom",
      label: "Release From",
      type: "date",
    },
    {
      key: "dateTo",
      label: "Release To",
      type: "date",
    },
  ],
};

// Genre Filter Config
export const genreFilterConfig: FilterConfig = {
  title: "Filter Genres",
  fields: [
    {
      key: "search",
      label: "Search",
      type: "text",
      placeholder: "Search by name...",
      gridCols: 2,
    },
    {
      key: "color",
      label: "Color",
      type: "select",
      options: [
        { value: "", label: "All Colors" },
        { value: "#FF6B6B", label: "Red" },
        { value: "#4ECDC4", label: "Teal" },
        { value: "#45B7D1", label: "Blue" },
        { value: "#96CEB4", label: "Green" },
        { value: "#FFEAA7", label: "Yellow" },
        { value: "#DDA0DD", label: "Purple" },
        { value: "#FFB347", label: "Orange" },
      ],
    },
    {
      key: "dateFrom",
      label: "Created From",
      type: "date",
    },
    {
      key: "dateTo",
      label: "Created To",
      type: "date",
    },
  ],
};
